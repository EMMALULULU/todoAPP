# ToDo List APP  
# Group (NO.6) Members  
| Name        | SID           | Email| Contribution to whole project |
| ------------- |:-------------:| :-----:| :-----:|
| ZHANG, Cao       | 20803018 |czhangdf@connect.ust.hk| 33.3% 
| HUANG, Xi     | 20785694       |xhuangcg@connect.ust.hk | 33.3% 
| LU, Zijun | 20784286       |zlubc@connect.ust.hk | 33.3% 

# Introduction  
Our project aims to use serverless computing to implement one ToDo List Application where a new user can sigh up for an account and a registered user can view, update and delete the existing items in the list as well as create new items to the list.  
The core functions of the ToDo List App are:  
1. Log in user  
2. Register user  
3. Add new to-do items  
4. Edit existing to-do items  
5. Update the status of completion for existing to-do items   
6. Remove existing to-do items  

Instead of using serverless services provided by the AWS, we take advantage of some open resources to build this general-purpose, event-driven ToDo List App:  
1. Use Kubernetes as the platform for the application.
2. Use OpenFaaS to deploy core functions  for the business logic.
3. Use Nginx to provide the gate between the client and the service.
4. Use PostgreSQL as database to store the information of registered users with related to-do lists and items.

#  Presentation Video
https://youtu.be/k2WPFsiGuno

#  Architecture Diagram:
![Untitled Diagram drawio 1](https://user-images.githubusercontent.com/96805200/168210975-a6091c74-7449-431c-b120-79c5b810ac20.png)


# Running the Application:
### Requirement:
The entire infrastructure is deployable in the cloud environment and local environment.
If you want to deploy to the local environment for testing, we highly recommend using docker desktop
and please update Docker desktop to V4.8.1.

For window user to intall the OpenFaas Cli using following command:
```
npm install --global @openfaas/faas-cli
```

To have a quick start, you can clone this repo and run. 
```
./boostrap.sh
```
Alternatively, you can run the command below to intall required resources step by step.

### deploy nginx
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
```

### add open faas to kubernetes cluster
```
kubectl apply -f faas-netes/namespaces.yml
```

### modify openfaas portal username and password to "admin"
```
kubectl -n openfaas create secret generic basic-auth --from-literal=basic-auth-user=admin --from-literal=basic-auth-password=admin
kubectl apply -f faas-netes/yaml/
kubectl apply -f faas-netes/faas-ingress.yml
```

### deploy postgres to kubernetes cluster
```
kubectl apply -f database
```

### deploy Server app 
```
kubectl apply -f server/server-k8s.yml
```

### login faas-cli to control portal
```
brew install faas-cli
faas-cli login -u admin -p admin -g "http://127.0.0.1:31112"
faas-cli list -g "http://127.0.0.1:31112"
```

### Build OpenFaas functions under folder functions
```
cd functions
YML_FILES=$(ls *.yml)

for YML_FILE in $YML_FILES
do 
    # faas-cli build -f $YML_FILE
    # faas-cli push -f $YML_FILE
    faas-cli deploy -f $YML_FILE

    kubectl get pods -n openfaas-fn
done;
```

### add domain to host file manually 
```
vim /private/etc/hosts/
127.0.0.1 faas.todolist.hkust.com
127.0.0.1 db.todolist.hkust.com
127.0.0.1 app.todolist.hkust.com
```


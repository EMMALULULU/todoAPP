# https://blog.csdn.net/boling_cavalry/article/details/109805296

# deploy nginx
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
# deploy postgres to kubernetes cluster
echo "Deploying postgres database to kubernetes cluster"
kubectl apply -f database
sleep 5

# add open faas to kubernetes cluster
echo "Deploying openfaas to kubernetes cluster"
kubectl apply -f faas-netes/namespaces.yml
kubectl apply -f faas-netes/faas-ingress.yml
sleep 5
kubectl apply -f faas-netes/yaml/
sleep 10

# deploy Server app 
kubectl apply -f server

# modify openfaas portal username and password to "admin"
kubectl -n openfaas create secret generic basic-auth --from-literal=basic-auth-user=admin --from-literal=basic-auth-password=admin
echo export OPENFAAS_URL=127.0.0.1:31112 >> ~/.bashrc

# login faas-cli to control portal
brew install faas-cli
faas-cli login -u admin -p admin -g "http://127.0.0.1:31112"
faas-cli list -g "http://127.0.0.1:31112"

echo "Deploying openfaas functions kubernetes cluster"

docker run -d -p 5000:5000 --name registry registry:2.7
cd functions
YML_FILES=$(ls *.yml)

for YML_FILE in $YML_FILES
do 
    faas-cli build -f $YML_FILE
    faas-cli push -f $YML_FILE
    faas-cli deploy -f $YML_FILE

    sleep 2
    kubectl get pods -n openfaas-fn
done;

# add domain to host file manually 
# vim /private/etc/hosts/
# 127.0.0.1 faas.todolist.hkust.com
# 127.0.0.1 db.todolist.hkust.com
# 127.0.0.1 app.todolist.hkust.com
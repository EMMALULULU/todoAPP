cd functions

faas-cli build -f update-todolist.yml
faas-cli push -f update-todolist.yml
faas-cli deploy -f update-todolist.yml

sleep 5
kubectl get pods -n openfaas-fn

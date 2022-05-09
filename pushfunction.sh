cd functions
YML_FILES=$(ls *.yml)

for YML_FILE in $YML_FILES
do 
    faas-cli build -f $YML_FILE
    faas-cli push -f $YML_FILE
    faas-cli deploy -f $YML_FILE

    sleep 5
    kubectl get pods -n openfaas-fn
done;

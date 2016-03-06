The primary goal is to illustrate how to connect to a MySQL database container launched by Openshift v3


For localhost...

node hello-mysql.js

For CDK...

docker build -t burr/nodeweb .
docker run -it -p 8000:8000 burr/nodeweb
ctrl-c

oc new-project mystuff

oc new-build burr/nodeweb --binary --name=nodeblue
oc start-build nodeblue --from-dir=.
oc get builds -w
oc new-app nodeblue

for blue-green demo

oc get svc
curl http://172.30.131.30:8000

oc expose svc/nodeblue --name=bluegreen --hostname=bluegreen.10.1.2.2.xip.io

http://bluegreen.10.1.2.2.xip.io/

edit hello-http.js
docker build -t burr/nodeweb .
oc new-build burr/nodeweb --binary --name=nodegreen
oc start-build nodegreen --from-dir=.
oc new-app nodegreen

oc get routes

oc edit route bluegreen

oc scale --replicas=2 dc/nodegreen




This is the main mono-repository for the Prognosis web-application source code. Below is the operational documentation, please follow it thorougly to ensure successful deployment of Prognosis.

# File Structure 

```
.
└── prognosis-mono/
    ├── api
    ├── web
    └── .gitignore
```

The *./api* directory contains the Python-oriented machine learning application programming interface (API) which handles and receives front-end data to be processed. The processed output will be the result that defines the medical report in the front end graphical user interface (GUI). Requirements to run the Python Flask API server are listed clearly on the requirements.txt file. Python version is Python 3.8.

The *./web* directory contains the Javascript-oriented front end web graphical user interface (GUI). Requirements to run the Javascript Node server are listed clearly on the package-lock.json file

# Things to note

Both directories are distinct and unique, please ensure two separate processes are initiated for each directories to prevent conflicts. Due to video file requirements, we have no choice but to remove tutorial videos during .zip file distribution located at .web/public/prognosisvideothings. If you wish to find said file, please refer to the Github repository at https://github.com/khaiyuanyap/prognosis-mono/tree/main/web/public/prognosisvideothings. Thanks for enjoying Prognosis and we hope that you can join us to make the world a better place.  

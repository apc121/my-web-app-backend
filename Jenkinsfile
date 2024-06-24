pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'nodejs'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
        CREDENTIALS_ID = '3.110.45.32'
        SERVER_USER = 'ubuntu'
        SERVER_IP = '13.201.163.216'
        REMOTE_DIR = '/var/www/my-web-app-backend/'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/apc121/my-web-app-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(['3.110.45.32']) {
                        sh '''
                        rsync -avz --delete --exclude 'node_modules' ./ ${env.SERVER_USER}@${env.SERVER_IP}:${env.REMOTE_DIR}
                        ssh ${env.SERVER_USER}@${env.SERVER_IP} "cd ${env.REMOTE_DIR} && npm install && pm2 restart all || pm2 start index.js"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Backend deployment successful!'
        }
        failure {
            echo 'Backend deployment failed!'
        }
    }
}

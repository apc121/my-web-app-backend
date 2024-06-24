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
                        rsync -avz -e "ssh -o StrictHostKeyChecking=no" --delete --exclude 'node_modules' --exclude '.git/' ./ ${SERVER_USER}@${SERVER_IP}:${REMOTE_DIR}
                        ssh ${SERVER_USER}@${SERVER_IP} "cd ${REMOTE_DIR} && npm install && pm2 restart all || pm2 start index.js"
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

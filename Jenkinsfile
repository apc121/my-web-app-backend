pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'nodejs'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
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
                sshagent(credentials: ['3.110.45.32']) {
                    sh '''
                    rsync -avz --delete --exclude 'node_modules' ./ ubuntu@13.201.163.216:/var/www/my-web-app-backend/
                    ssh ubuntu@13.201.163.216 'cd /var/www/my-web-app-backend && npm install && pm2 restart all || pm2 start index.js'
                    '''
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

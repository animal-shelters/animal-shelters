# Animal Shelters
## <a name="env-config">Environment configuration</a>
[/]\
**SERVER_NAME** \
Name of server domain \
Default value: www.example.com

[API]\
**DEV_EMAIL** \
Email for admin user\
Default value: example@example.com\
**DEV_PASSWORD** \
Password for admin user\
Default value: !ChangeMe! \
**DATABASE_URL**\
Template: postgresql://**login**:**password**@127.0.0.1:5432/app?serverVersion=15&charset=utf8s\
Example: postgresql://**myLogin**:**mySafePassword**@127.0.0.1:5432/app?serverVersion=15&charset=utf8

## Production instalation
* clone repository with `git clone`
* [setup environment files](#env-config) 
	* animal-shelters/.env.dist [/]
	* animal-shelters/api/.env [API]
* run following commands in terminal
	* `cd animal-shelters`
	*  `cp .env.dist .env`  
	* `docker compose -f docker-compose.prod.yml -f docker-compose.yml up` 

## Credits
 Project created from template: https://github.com/api-platform/api-platform


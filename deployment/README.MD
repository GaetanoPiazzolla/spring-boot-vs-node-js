For evaluating performance we do not need any docker-compose cache or DB initialization.

Run always with:  

```shell
docker-compose rm -f
docker-compose pull
docker-compose up --build --force-recreate
```


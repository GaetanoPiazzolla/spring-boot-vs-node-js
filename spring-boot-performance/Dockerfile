FROM adoptopenjdk/openjdk11:centos as builder

WORKDIR /src
COPY src ./src/
COPY gradle ./gradle/
COPY build.gradle ./
COPY gradlew ./
COPY settings.gradle ./
#COPY gradle.properties ./
RUN chmod 777 ./gradlew
RUN ./gradlew clean build --exclude-task testClasses

##
#  Second Stage
##
FROM adoptopenjdk/openjdk11:centos
EXPOSE 8080
COPY --from=builder /src/build/libs/spring-boot-*  /app/spring-boot.jar
ENTRYPOINT ["java","-Duser.timezone=GMT+1","-jar","/app/spring-boot.jar"]
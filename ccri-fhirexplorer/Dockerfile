FROM openjdk:11-slim
VOLUME /tmp

COPY target/ccri-fhir-explorer.jar ccri-fhir-explorer.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/ccri-fhir-explorer.jar"]



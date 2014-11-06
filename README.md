# Aperture
Aperture is a webapp that makes it easy to use the [SentiBank](http://www.ee.columbia.edu/ln/dvmm/vso/download/sentibank.html) API.
[See it in action](http://lock.autonlab.org:8080/aperture)

# Build
```shell
ant war # creates dist/aperture.war
ant clean
```
# Deploy
Copy the .WAR file to the webapps folder of a servlet container, such as Jetty, Tomcat.

# License
Code and document are copyright 2014 [the Auton lab](http://www.autonlab.org). Code released under [the MIT license](https://github.com/d8w/aperture/blob/master/LICENSE).

# tesla

```
npm install teslapi
```

Basically refactored version of https://github.com/mseminatore/TeslaJS

* async/await native
* works in *both* browser and server!!
* a lot less code ;)

# Warranty Disclaimer

You may use this library with the understanding that doing so is 
**AT YOUR OWN RISK**. No warranty, express or implied, is made with regards 
to the fitness or safety of this code for any purpose. If you use this 
library to query or change settings of your vehicle you understand that it 
is possible to make changes that could inadvertently lower the security of 
your vehicle, or cause damage, through actions including but not limited to:

* Unlocking the vehicle
* Remotely starting the vehicle
* Opening the sunroof
* Opening the frunk or trunk
* Lowering the battery charge level
* Impacting the long-term health of your battery

> Please be careful not to use this code in a way that loads the Tesla servers
> with too many concurrent requests. Calling the Tesla REST APIs at a very high 
> frequency will stress the Tesla servers and could get your IP or favorite
> cloud service blocked by Tesla. Or in the worst case it could cause Tesla 
> to revoke the key that enables access via this and many other libraries.



# symlink-creator-nw

Simple demo NW.js application to create symbolic links.

---

- Download and unpack [the release archive](https://github.com/AlttiRi/symlink-creator-nw/releases): 
- Download [NW.js SDK](https://nwjs.io/), then unpack it to `C:/progs/nwjs-sdk`.
- Run `run-with-sdk` (`.bat`, or `.sh`) file.

For development change `"main"` in `package.json`
from `"dist/index.html"` to `"http://localhost:5173/index.html"` and add the follow line:
```
"node-remote": "http://localhost:5173",
```


---

It supports drag'n'drop.

![image](https://user-images.githubusercontent.com/16310547/210879324-2dd796fb-c782-4286-9cec-d0595c692554.png)

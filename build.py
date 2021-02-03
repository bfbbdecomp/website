import subprocess
import os

path = os.path.dirname(os.path.realpath(__file__))

commands = [  #
    {
        "cwd":
        path,
        "cmd": [  #
            ["pip", "install", "gitpython"],
            ["npm", "install", "-g", "parcel-bundler"]
        ]
    },
    {
        "cwd": path + "/python/",
        "cmd": [
            ["python", "process.py"],
        ]
    },  #
    {
        "cwd": path,
        "cmd": [
            ["npm", "install"],
            ["npm", "run", "build"],
        ]
    }
]

for c in commands:
    cwd = c["cwd"]
    cmds = c["cmd"]
    for cmd in cmds:
        print(cwd, ' '.join(cmd))
        #subprocess.run(cmd, cwd=cwd, shell=True)
        subprocess.Popen(cmd, cwd=cwd)
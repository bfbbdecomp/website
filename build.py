import subprocess
import os

path = os.path.dirname(os.path.realpath(__file__))

commands = [  #
    {
        "cwd":
        path,
        "cmd": [  #
            ["pip", "install", "gitpython"],  #
            ["pip", "install", "requests"],
        ]
    },
    {
        "cwd": path + "/python/",
        "cmd": [
            ["python", "process.py"],
        ]
    },  #
    {
        "cwd":
        path,
        "cmd": [
            ["npm", "install", "-g", "parcel-bundler"],  #
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
        # Should put shell=true on windows
        proc = subprocess.Popen(cmd, cwd=cwd)
        proc.wait()
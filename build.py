import subprocess
import os

path = os.path.dirname(os.path.realpath(__file__))

commands = [
    "dotnet run --project BFBB/ProgressHelper progress.json json/",
    "npm install",
    "npm run build"
]

for command in commands:
    proc = subprocess.run(command, shell=True)
    if proc.returncode != 0:
        raise RuntimeError(f"Command {command} failed with return code {proc.returncode}")
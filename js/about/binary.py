binary = """2C 03 00 00
40 80 00 28 
3C 80 80 3C
7C A3 00 D0
38 84 05 58
80 04 1B 00
7C 05 00 00
40 81 00 10
38 00 00 00
90 04 1B 00
4E 80 00 20
3C A0 80 3C
3C 80 00 02
38 C5 05 58
80 A6 1B 00
38 04 86 9F
7C 65 1A 14
7C 03 00 40
90 66 1B 00
4C 81 00 20
90 06 1B 00
4E 80 00 20"""


def tobin(x):
    return bin(int(x, 16))[2:].zfill(8)


lines = binary.splitlines()
for l in lines:
    s = list(map(tobin, l.split()))
    print(" ".join(s))

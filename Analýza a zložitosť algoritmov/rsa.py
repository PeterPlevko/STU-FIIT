def inverz(a, b):
    if b > a:
        c = a
        a = b
        b = c

    q = []

    i = 1
    while b != 0:
        q.append(int(a / b))
        c = a % b
        a = b
        b = c
        i += 1

    print("\n")
    i -= 2
    A = 0
    B = 1
    A_final, B_final = 0, 0
    while i >= 0:
        B_final = B
        C = A
        A = B
        B = C - q[i - 1] * A
        i -= 1

    return B_final


p = int(input("Cislo p: "))
q = int(input("Cislo q: "))

n = p*q
print("n = ", n)
piN = (p-1)*(q-1)
print("pi(n) = ", piN)

e = int(input("Cislo e: "))
d = inverz(piN, e) % piN

print("d = ", d)
print(f"(e, n) - verejny kluc: ({e},{n})")
print(f"(d, n) - sukromny kluc: ({d},{n})")

x = int(input("Sprava x: "))

print()
print("Kodovanie:")
result = 1
i = 0
for kkt in reversed(list(str(bin(e)))[2:]):
    if kkt == '1':
        result *= x
        result %= n
    print(f"{kkt}: y{i} = y{i-1}^2 mod {n} = {x%n}")
    x = x*x
    x %= n
    i += 1

result %= n
print(f"Zakodovana sprava y = {result}")
print()
print("Dekodovanie:")
x = result
result = 1
i = 0
for kkt in reversed(list(str(bin(d)))[2:]):
    if kkt == '1':
        result *= x
        result %= n
    print(f"{kkt}: x{i} = x{i-1}^2 mod {n} = {x%n}")
    x = x*x
    x %= n
    i += 1

result %= n
print(f"Dekodovana sprava y = {result}")

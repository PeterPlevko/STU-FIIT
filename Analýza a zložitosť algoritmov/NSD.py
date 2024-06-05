a = int(input("Cislo a: "))
b = int(input("Cislo b: "))
a_original = a
b_original = b

if b > a:
    c = a
    a = b
    b = c

q = []

print("|   i |   a |   b |   q |")
print("-------------------------")
i = 1
while b != 0:
    print("| {:3d} | {:3d} | {:3d} | {:3d} |".format(i, a, b, int(a/b)))
    q.append(int(a/b))
    c = a % b
    a = b
    b = c
    i += 1

print("\n")
i -= 2
A = 0
B = 1
A_final, B_final = 0, 0
print("|   i |   A |   B |")
print("-------------------")
while i >= 0:
    A_final = A
    B_final = B
    print("| {:3d} | {:3d} | {:3d} |".format(i+1, A, B))
    C = A
    A = B
    B = C - q[i-1]*A
    i -= 1

print(f"\n{max(a_original, b_original)} * {A_final} + {min(a_original, b_original)} * {B_final} = {max(a_original, b_original) * A_final + min(a_original, b_original) * B_final}")

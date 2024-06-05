from random import uniform


def main():

    for i in range(80):
        with open("maps/input" + str(i), "w") as file:

            boulder_chance = uniform(0, 0.2)
            leaf1_chance = uniform(0.01, 0.2)
            leaf2_chance = uniform(0.01, leaf1_chance)
            leaf3_chance = uniform(0.01, leaf2_chance)
            leaf4_chance = uniform(0.001, leaf3_chance)
            leaf5_chance = uniform(0.001, leaf4_chance)

            for j in range(i // 5 + 5):
                for k in range(i // 5 + 5):

                    if uniform(0, 1) < boulder_chance:
                        print("X", end=" ", file=file)
                        continue

                    if uniform(0, 1) < leaf1_chance:
                        print("l1", end=" ", file=file)
                        continue

                    if uniform(0, 1) < leaf2_chance:
                        print("l2", end=" ", file=file)
                        continue

                    if uniform(0, 1) < leaf3_chance:
                        print("l3", end=" ", file=file)
                        continue

                    if uniform(0, 1) < leaf4_chance:
                        print("l4", end=" ", file=file)
                        continue

                    if uniform(0, 1) < leaf5_chance:
                        print("l5", end=" ", file=file)
                        continue

                    print("0", end=" ", file=file)

                print(file=file)


main()

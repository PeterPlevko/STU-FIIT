from time import time
import Generator, Algorithms


def main():

    # Reset out
    open("out", "w").close()

    for k in [5, 10, 20]:
        for vertex_amount_index in range(11, 31):

            vertex_amount = vertex_amount_index * 50
            print(k, vertex_amount)

            sum_distances = []
            sum_time = []

            vertices = Generator.generate_fancy_clusters((5000, 5000), k, vertex_amount, 100)

            for test_index in range(10):

                print(test_index)

                sum_distances.append([])
                sum_time.append([])

                for algo in [Algorithms.k_means, Algorithms.agglomerative_brute, Algorithms.agglomerative_matrix, Algorithms.divisive]:
                    for recalculate in [Algorithms.recalculate_clusters_average, Algorithms.recalculate_clusters_medoid]:

                        start_time = time()

                        colored_array, cluster_array = algo(k, vertices, 100, recalculate)

                        sum_time[test_index].append(time() - start_time)

                        avg = Algorithms.calculate_average_offsets(colored_array[-1], cluster_array[-1])
                        avg = Algorithms.average_int(avg)

                        sum_distances[test_index].append(avg)

            with open("out", "a") as file:

                average_distances = list([Algorithms.average_float(sum_distances, key=lambda x: x[i]) 
                        for i in range(len(sum_distances[0]))])
                average_time = list([Algorithms.average_float(sum_time, key=lambda x: x[i])
                        for i in range(len(sum_time[0]))])

                print(k, vertex_amount, "||", 
                        " ".join([str(x) for x in average_distances]), 
                        "|", 
                        " ".join([str(x) for x in average_time]), file=file)

            
main()

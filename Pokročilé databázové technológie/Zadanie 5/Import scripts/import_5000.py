writeString = ''
counter = 0

with open("./normalized_tweets_5000.json", encoding='utf-8') as file:
    for line in file:
        counter += 1
        print(counter)
        writeString += writeString + '{ "create" : {} }\n' + line
        with open('bulk_insert_5000.json', "a", encoding='utf-8') as file_object:
            file_object.write(writeString)
        print(counter)
        writeString = ''

//Matej Pirschel Zadanie 2 SPAASM 2021
/*
Text zadania:
Napíšte v jazyku C jednoduchý interaktívny "shell" ktorý umožní spúšťať zadané príkazy a
bude interpretovať aspoň nasledujúce špeciálne znaky: # ; < > | \ . Príkazy musí byť
možné zadať zo štandardného vstupu a tiež zo spojení reprezentovaných soketmi. Na
príkazovom riadku musí byť možné špecifikovať prepínačom -p port číslo portu a
prepínačom -u cesta názov lokálneho soketu na ktorých bude program čakať na
prichádzajúce spojenia. Po spustení s prepínačom -h sa musia vypísať informácie o
autorovi, účele a použití programu. "Shell" musí poskytovať aspoň nasledujúce interné
príkazy: help - výpis informácií ako pri -h, quit - ukončenie spojenia z ktorého príkaz
prišiel, halt - ukončenie celého programu.
Prednastavený prompt musí pozostávať z mena používateľa, názvu stroja, aktuálneho času
a zvoleného ukončovacieho znaku, e.g. '16:34 user17@student#'. Na zistenie týchto
informácií použite vhodné systémové volania s použitím knižničných funkcií. Na
formátovanie výstupu, zistenie mena používateľa z UID a pod. môžte v programe využiť
bežné knižničné funkcie. Spúšťanie príkazov a presmerovanie súborov musia byť
implementované pomocou príslušných systémových volaní. Tie nemusia byť urobené
priamo (cez assembler), avšak knižničná funkcia popen(), prípadne podobná, nesmie byť
použitá. Počas vytvárania programu sa nesmú zobrazovať žiadne varovania a to ani pri
zadanom prepínači prekladača -Wall.
Vo voliteľných častiach zadania sa očakáva, že tie úlohy budú mať vaše vlastné riešenia,
nie jednoduché volania OS.

Completed optional tasks:
 1. (2 body) Neinteraktívny režim - "shell" bude spracovávať aj príkazy v zadaných
súboroch (skript).

 2. (3 body) Program bude fungovať aj pod OS Linux (respektíve pod iným OS).

 3. (3 body) Interný príkaz stat vypíše zoznam všetkých aktuálnych spojení na
ktorých prijíma príkazy, prípadne aj všetky sokety na ktorých prijíma nové
spojenia.

 7. (3 body) Na zistenie informácií do prednastaveného promptu (meno užívateľa,
názvu stroja, aktuálneho času a zvoleného ukončovacieho znaku) použte vhodné
systémové volania priamo (napr. cez "inline assembler"), bez použitia knižničných
funkcií.

 27. (5 bodov) Použitie signálov. E. g. znovunačítanie konfiguračného súboru po
príchode zvoleného signálu, zachytenie Ctrl+C, vykonanie príkazu halt, quit a help
(alebo iné).

28. (2 body) Funkčný Makefile.

30. (1 bod) Dobré komentáre, resp. rozšírená dokumentácia, v anglickom jazyku.

 Together 19 bonus points.
  */
//c imports
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
//system imports
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <signal.h>
#include <sys/select.h>
#include <netinet/in.h>
#include <fcntl.h>
#include <sys/time.h>
#include <pwd.h>
#include <ctype.h>
// constants
#define BUFF_SIZE 64580
#define  MAX_LISTENERS 3
#define SERVER 0
#define CLIENT 1
#define NO_CON 2

// global variables
char path_name[50];
int port = 12345;
int mode = 2;

// help function
void help() {
    printf("This is help of my shell.\n"
           "You can use switch -c for connecting as client\n"
           "-s for server\n"
           "-p <port number> to set port\n"
           "-h for help\n"
           "-u for naming a local socket."
           "\n");
}

// builtin functions
int halt_b(char **args);

int help_b(char **args);

int stat_b(char **args);


//List of commands to call built in functions.
char *builtin_str[] = {
        "halt",
        "help",
        "stat"
};

//order of built in functions
int (*builtin_func[])(char **) = {
        &halt_b,
        &help_b,
        &stat_b
};

int halt_b(char **args) {
    exit(1);
}

int help_b(char **args) {
    help();
    return 1;
}

int stat_b(char **args) {
    printf("Používaný port je: %d\n Používaná ip adresa je 127.0.0.1\n", port);
    return 1;
}


// function to get actual time
int *getTime() {
    int hours, minutes;
    time_t now;
    time(&now);
    struct tm *local = localtime(&now);
    hours = local->tm_hour;
    minutes = local->tm_min;
    printf("%02d:%02d ", hours, minutes);
    return 0;
}

// function to get machine name with help of assembly
char *getUsername() {
    struct passwd *pws;
    int id;
    asm("mov $24, %%eax;"
        "int $0x80;"
    : "=a"(id));
    pws = getpwuid(id);
    static char meno[100] = "";
    strcpy(meno, pws->pw_name);
    strcat(meno, "@");
    char hostmeno[50] = "";
    gethostname(hostmeno, 50);
    strcat(meno, hostmeno);
    strcat(meno, "#");
    printf("%s ", meno);
    return meno;
}

// function to split input from user to orders into 3D array of lines, containing words, containing letters
//on each line is a separate command or special characters |, >, <, ;
//end of input stamped with NULL
char ***split_input(char *input) {
    int a = 0, b = 0, c = 0, i = 0, next = 0;

    char ***splitted = (char ***) calloc(64 * 64 * 64, sizeof(char **));
    splitted[0] = (char **) calloc(64 * 64, sizeof(char *));
    splitted[0][0] = (char *) calloc(64, sizeof(char));

    while (input[i] != '\0' && input[i] != '#' && input[i] != '\n') {
        if (input[i] == '<' || input[i] == '>' || input[i] == '|' || input[i] == ';') {
            ++a;
            splitted[a] = (char **) calloc(2, sizeof(char *));

            b = 0;
            splitted[a][b] = (char *) calloc(2, sizeof(char));
            c = 0;
            splitted[a][b][c] = input[i];
            ++a;
            splitted[a] = (char **) calloc(64 * 64, sizeof(char *));
            splitted[a][b] = (char *) calloc(64, sizeof(char));
        } else if (input[i] == '\\') {
            ++i;
            splitted[a][b][c] = input[i];
        } else if (input[i] == '$' || input[i] == '`' || input[i] == '\"') {
            ++i;
            continue;
        } else if (input[i] == ' ') {
            if (c != 0) {
                ++b;
                splitted[a][b] = (char *) calloc(64, sizeof(char));
                c = 0;
            }
        } else {
            splitted[a][b][c] = input[i];
            ++c;
        }
        i++;
    }
    a++;
    b = 0;
    splitted[a] = NULL;
    printf("\n");
    return (char ***) splitted;
}
void int_handler(int sig){
    printf("Sigint caught\nPress enter to continue.\n");
    (void)signal(SIGINT, int_handler);
}

void tstp_handler(int sig){
    help();
    (void)signal(SIGTSTP, tstp_handler);
    printf("Press enter to continue.\n");
}

// function to handle no connection mode
void no_con() {
    // setting variables
    int fd[2], std_in, std_out, in_file, out_file;
    std_in = dup(0);
    std_out = dup(1);
    printf("you are in no connection mode now:\n");
    (void)signal(SIGINT, int_handler);
    (void)signal(SIGTSTP, tstp_handler);
    // listen input in endless loop
    while (1) {
        // printing prompt
        getTime();
        getUsername();
        // allocating array pointer
        char *input = (char *) malloc(BUFF_SIZE * sizeof(char));
        // reading input into buffer
        fgets(input, BUFF_SIZE, stdin);
        // allocating 3D array pointer and inserting formatted input
        char ***orders = split_input(input);
        // free input
        free(input);
        // iterate formatted input line by line
        for (int i = 0; i < 64; i++) {
            if (orders[i] == NULL) {
                break;
            }
            // builtin functions
            int builtin = 0;
            for (int j = 0; j < 3; j++) {
                if (strcmp(orders[i][0], builtin_str[j]) == 0) {
                    builtin_func[j](orders[i]);
                    builtin = 1;
                    break;
                }

            }
            if (builtin == 1) {
                break;
            }

            if (pipe(fd) < 0) {
                perror("Pipe error");
            }
            // managing special characters
            if (strcmp(orders[i][0], "|") == 0) {
                continue;
            }

            if (strcmp(orders[i][0], ";") == 0) {
                continue;
            } else if (strcmp(orders[i][0], ">") == 0) {
                ++i;
                continue;
            } else if (strcmp(orders[i][0], "<") == 0) {
                ++i;
                continue;
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], ">") == 0) {
                if (orders[i + 2] != NULL) {
                    out_file = open(orders[i + 2][0], O_WRONLY | O_CREAT, 0666);
                    if (out_file < 0) {
                        perror("error");
                    }
                } else perror("Redirection error");
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "<") == 0) {
                if (orders[i + 2] != NULL) {
                    in_file = open(orders[i + 2][0], O_RDONLY, 0666);
                    if (in_file < 0) {
                        perror("error");
                    }
                } else perror("Redirection error");
            }

            // order execution
            if (fork() == 0) {
                // handling redirections
                if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "|") == 0) {
                    close(fd[0]);
                    dup2(fd[1], STDOUT_FILENO);
                } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], ">") == 0) {
                    dup2(out_file, STDOUT_FILENO);
                } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "<") == 0) {
                    dup2(in_file, STDIN_FILENO);
                }
                // execute order
                execvp(orders[i][0], orders[i]);
                // if something bad happens call error
                perror("Error");
                // exit child
                _exit(1);
            }
            // parent process, child will not get here!!!, wait for child to complete
            wait(NULL);
            // closing pipe
            close(fd[1]);
            // closing open files
            if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], ">") == 0) {
                close(out_file);
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "<") == 0) {
                close(in_file);
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "|") == 0) {
                dup2(fd[0], STDIN_FILENO);
            }
            close(fd[0]);
            // free memory
            free(orders[i]);
        }
        // redirect outpput and input to standard
        dup2(std_in, STDIN_FILENO);
        dup2(std_out, STDOUT_FILENO);
    }

}

// this function handles client connection
void client() {
    printf("you are client now\n");
    int sock, conn_status;
    struct sockaddr_in conn_info;
    char output[BUFF_SIZE], input[BUFF_SIZE];
    // setting connection
    sock = socket(AF_INET, SOCK_STREAM, 0);
    conn_info.sin_family = AF_INET;
    conn_info.sin_port = htons(port);
    conn_info.sin_addr.s_addr = INADDR_ANY;
    conn_status = connect(sock, (struct sockaddr *) &conn_info, sizeof(conn_info));
    if (conn_status < 0) {
        printf("Could not connect... disconnecting from client\n");
        return;
    }
    // infinite loop where clients waits for input from user,
    // then sends it to server and waits for response
    // the response is then outputted to stdout
    while (1) {
        getTime();
        getUsername();
        fgets(input, BUFF_SIZE, stdin);
        if (strstr(input, "quit")){
            close(sock);
            break;
        }
        write(sock, input, strlen(input));
        read(sock, &output, sizeof(output));
        printf("%s", output);
    }
}

// function to handle server connection and similarly to no connection executes inputted
// commands, but output is sent to right client
void server() {
    printf("you are server now\n");
    int fd[2], std_in, std_out, in_file, out_file, sock, bind_status,
            opt, client_sock, server_stdout, output_size;
    struct sockaddr_in conn_info;
    char input[BUFF_SIZE];


    std_in = dup(0);
    std_out = dup(1);
    opt = 1;
    sock = socket(AF_INET, SOCK_STREAM, 0);
    conn_info.sin_family = AF_INET;
    conn_info.sin_port = htons(port);
    conn_info.sin_addr.s_addr = INADDR_ANY;
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, (char *) &opt, sizeof(opt));
    bind_status = bind(sock, (struct sockaddr *) &conn_info, sizeof(conn_info));
    if (bind_status < 0) {
        printf("Could not bind port or address to socket... quiting server\n");
        return;
    }
    listen(sock, MAX_LISTENERS);
    client_sock = accept(sock, NULL, NULL);

    while (1) {
        // setting output to temporary file
        server_stdout = open("server_output.tmp", O_WRONLY | O_CREAT | O_TRUNC, 0666);
        if (server_stdout < 0) {
            printf("Could not open file server_output.tmp\n");
            return;
        }
        // waiting for input
        read(client_sock, &input, sizeof(input));
        if (strcmp(input, "quit") == 0) {
            close(client_sock);
            break;
        }
        // following code similar to no connection input handling
        char ***orders = split_input(input);
        for (int i = 0; i < 64; i++) {
            if (orders[i] == NULL) {
                break;
            }
            int builtin = 0;
            for (int j = 0; j < 3; j++) {
                if (strcmp(orders[i][0], builtin_str[j]) == 0) {
                    builtin_func[j](orders[i]);
                    builtin = 1;
                    break;
                }

            }
            if (builtin == 1) {
                break;
            }

            if (pipe(fd) < 0) {
                perror("Pipe error");
            }

            if (strcmp(orders[i][0], "|") == 0) {
                continue;
            }
            if (strcmp(orders[i][0], "halt") == 0) {
                continue;
            }

            if (strcmp(orders[i][0], ";") == 0) {
                continue;
            } else if (strcmp(orders[i][0], ">") == 0) {
                ++i;
                continue;
            } else if (strcmp(orders[i][0], "<") == 0) {
                ++i;
                continue;
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], ">") == 0) {
                if (orders[i + 2] != NULL) {
                    out_file = open(orders[i + 2][0], O_WRONLY | O_CREAT, 0666);
                    if (out_file < 0) {
                        perror("error");
                    }
                } else perror("Redirection error");
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "<") == 0) {
                if (orders[i + 2] != NULL) {
                    in_file = open(orders[i + 2][0], O_RDONLY, 0666);
                    if (in_file < 0) {
                        perror("error");
                    }
                } else perror("Redirection error");
            }


            if (fork() == 0) {

                if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "|") == 0) {
                    close(fd[0]);
                    dup2(fd[1], STDOUT_FILENO);
                } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], ">") == 0) {
                    dup2(out_file, STDOUT_FILENO);
                } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "<") == 0) {
                    dup2(in_file, STDIN_FILENO);
                } else {
                    dup2(server_stdout, STDOUT_FILENO);
                }
                execvp(orders[i][0], orders[i]);
                // if something bad happens call error
                perror("Error");
                // exit child
                _exit(1);
            }
            // parent process, child will not get here!!!, wait for child to complete
            wait(NULL);
            // closing pipe
            close(fd[1]);
            if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], ">") == 0) {
                close(out_file);
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "<") == 0) {
                close(in_file);
            } else if (orders[i + 1] != NULL && strcmp(orders[i + 1][0], "|") == 0) {
                dup2(fd[0], STDIN_FILENO);
            }
            close(fd[0]);
            free(orders[i]);
        }
        // close open files and send response with output to client
        dup2(std_in, STDIN_FILENO);
        dup2(std_out, STDOUT_FILENO);
        close(server_stdout);
        server_stdout = open("server_output.tmp", O_RDONLY, 0666);
        output_size = read(server_stdout, &input, sizeof(input));
        close(server_stdout);
        remove("server_output.tmp");
        input[output_size] = '\0';
        write(client_sock, input, output_size + 1);
    }
    // close socket after quitting
    close(sock);
}

// main function to decide what mode to use
int main(int argc, char **argv) {
    int i = 1, c_bool = 0, s_bool = 0, a;

    strcpy(path_name, "./sck");

    while ((a = getopt(argc, argv, ":hscp:p:")) != -1) {
        switch (a) {
            case 'p':
                port = atoi(optarg);
                break;
            case 'h':
                help();
                break;
            case 's':
                mode = SERVER;
                break;
            case 'c':
                mode = CLIENT;
                break;
            case ':':
                help();
                break;
            case '?':
                printf("Illegal argument: %c\n", optopt);
                break;
        }
    }
    switch (mode) {
        case SERVER:
            server();
            break;
        case CLIENT:
            client();
            break;
        case NO_CON:
            no_con();
            break;
        default:
            break;
    }
    
    return EXIT_SUCCESS;
}

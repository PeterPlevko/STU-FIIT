include D:\macros.asm
.model small
name zadanie1 ; Matej Pirschel Zadanie c. 1 uloha 6 SPAaSM
;6. Vypísať všetky riadky vstupu a pred každý napísať jeho poradové číslo.
;1. Plus 1 bod: Po zadaní prepínača '-p' bude výstup stránkovaný, teda po zaplnení obrazovky sa počká na stlačenie klávesu.
;4. Plus 1 bod: Pri stránkovaní sa vždy zobrazí aj aktuálny dátum a čas.
;11.Plus 1 bod je možné získať za (zmysluplné) použitie reťazcových inštrukcií (MOVS, CMPS, STOS, etc.).
;12.Plus 1 bod je možné získať za (dobré) komentáre, resp. dokumentáciu, v anglickom jazyku
; this code includes:
; printing lines from input with line indexes
; paging
; shows time when paging
; comments in english language
; uses string instructions

data segment

    HELP_MESSAGE db 'Matej Pirschel Zadanie1 uloha 6',10,13,'This program prints all lines from a file with index at the start of each line',10,13,10,13,'Usage: spaasm1 [-h] filename',10,13,'       -h print help',10,13, '       <filename> input file',10,13,'$'
    STR_MSG_INVALID_ARGS db 'Error: Invalig Argument',10,13,'Use spaasm1 -h for more information about this program',10,13,'$'
    STR_MSG_FILE_ERR db 'Error: Could not open or read file',10,13,'Exiting...',10,13,'$'

    paging_start db '** ','$'
    space db ' $'
    info db 'Press any key: $' 
    msg_dot db '.$'
    msg_doubledot db ':$'
  
    ARGS_2ND_CHAR equ 82h                           ; address of second argument character
    ARGS_3RD_CHAR equ 83h                           ; address of third argument character
	ARGS_LENGHT_ADDR equ 80h                        ; address of byte with number of characters in input
    BUFFER_SIZE equ 500                            ; read file by chunks of 1000 bytes 
    buffer_2 db BUFFER_SIZE+1 dup('$')              ; second buffer for reading from file(dollars to stop reading when needed)
	buffer db BUFFER_SIZE+1 dup('$')                ; buffer for reading from file(dollars to stop reading when needed)
    
	args_chars_lenght db 0		                    ; variable for storing number of characters inputed 
    line_count dw ?
	
	;variables for file reading and paging
	eof_flag dw 0
    count_mode dw 0
    file_name db 20 dup('$')
    local_offset dw 0
    bytes_to_read dw 0
    current_line_start dw 0
    current_line_end dw -1
    file_handle dw 0
    current_line_size dw 0
    bytes_read dw 0
    
    paging_columns dw 0
    paging_rows dw 0


data ends

stck segment stack
    dw 64 dup(?)
stck ends

code segment
    assume cs:code, ss:stck, ds:data

;procedure to read arguments
check_args_p proc

    mov al, ds:[ARGS_LENGHT_ADDR]                   ; move lenght of arguments in characters to AX
    mov args_chars_lenght, al

    cmp al, 0                                       ; compare AL with 0 and set flag 
    ; if there are any arguments, check them
        jne CheckForHelp                         ; if arg len not 0 jump to next arg check
    ; print error message if there are no arguments 
        print_m data, STR_MSG_INVALID_ARGS          ; if arg len 0, print error
        exit_m                                      ; call exit macro

    ;check if the first argument is  -h or -p
    CheckForHelp:                                   
        mov al,ds:[ARGS_2ND_CHAR]                   ; move second arg character to AL
        cmp al,'-'                                  ; compare AL with '-'
        ; if no '-' no switch was inputed
            jne CheckFileName                       ; jump if invalid parameter and exit program
    
        mov al,ds:[ARGS_3RD_CHAR]                   ; move third arg character to AL
        cmp al,'p'                                  ; compare AL with 'p'
        ; if -p switch was read 
            je SetPaging                            ; jump to paging
        cmp al,'h'                                  ; compare AL with 'h'
        ; if wrong switch was inputed
            jne InvalidArgParam;                    ; jump if invalid parameter and exit
        print_m data, HELP_MESSAGE                  ; if -h switch, print help
        exit_m                                      ; call exit macro

    InvalidArgParam:                                ; if invalid 3 character parameter
        print_m data, STR_MSG_INVALID_ARGS          ; print error message
        exit_m                                      ; call exit macro


    SetPaging:

        push ds
        mov ax,seg data     ; copy data segment addr to AX
        mov ds,ax               ; set DS to data segment address

        ; set mode to page count mode
        mov ax, 1
        mov data:count_mode, ax

        pop ds

        xor cx, cx
        mov cl, args_chars_lenght

        sub cl, 4                                   ; subtract 4 from arg length (space + switch + space)

        mov si, ARGS_LENGHT_ADDR+5                  ; copy address of first real char of argument to SI register
        jmp EndProc

    ; 
    CheckFileName:
        mov si, ARGS_LENGHT_ADDR+2                  ; copy address of first real char of argument to SI register
        xor cx, cx
        mov cl, args_chars_lenght
        sub cl, 1                                   ; subtract space from arg length

    ;
    EndProc:

        cld                                         ; move forward
        mov ax,seg data                             ; copy data segment address to AX;
        mov es,ax                                   ; copy data segment address from AX to ES
        mov di, offset file_name                    ; copy address of file_name variable to DI (destination address used by movsb)

        rep movsb                                   ; move CX charaters from SI to DI
        ret
check_args_p endp


open_file_p proc
    mov ax,seg data             ; copy data segment addr to AX
    mov ds,ax                   ; set DS to data segment address
    mov ax,3d00h                ; 3dh - open file, 00h - read only mode
                                ; returns file_handle to AX if successful
    lea dx,[file_name]          ; move the offset of the [] to the DX
    int 21h             
    ; IF NO ERROR
        jnc NoError
    ; IF ERROR
        print_m data, STR_MSG_FILE_ERR
        exit_m
    
    NoError:
        mov file_handle,AX      ; copy file handle to file_handle data variable
    ret                         ; return from procedure
open_file_p endp 

read_file_p proc
    mov bx,file_handle          ; copy file_handle to BX (used when reading from file)
    mov ah,3fh                  ; DOS function: 3fh - Read from File or Device, Using a Handle
    mov dx, offset buffer       ; address of buffer to read file 
    mov cx, BUFFER_SIZE         ; bytes to read (used when reading from file)
    int 21h                     
    ret                         ; return from procedure
read_file_p endp

;procedure to print more digit number
print_integer_p proc

    ; store values of register in stack
    push ax
    push bx
    push cx
    push dx

    ; ax is quotient, dx is remainder, cx number of digits

    xor bx,bx
    mov bx,10
    xor cx,cx
first:
    xor dx,dx
    div bx
    push dx
    inc cx
    cmp ax,0
    jnz first
second: 
    pop dx
    add dl,'0'
    mov ah,02h
    int 21h
    loop second     ;decrements CX by 1, then transfers control to short-label if CX  is not 0.

    ; recover values of registers from stack
    pop dx
    pop cx
    pop bx
    pop ax

    ret

print_integer_p endp

move_file_pointer_to_ax_p proc

    ; move file pointer to value in AX
    mov bx, file_handle
    mov cx, 0h
    mov dx, ax
    mov ax, 4200h
    int 21h

    ret

move_file_pointer_to_ax_p endp


read_next_line proc
        mov ax, current_line_end		;move end of last line to ax
        mov current_line_size, 0		;set current line length 

        inc ax                          ; move pointer to new line
        call move_file_pointer_to_ax_p

        mov current_line_start, ax      ; point to start of this line
        mov current_line_end, ax        ; point to end of this line
        mov local_offset, 0
    
    ReadNextChunk:
        call read_file_p                            ; run readFile procedure, returns AX - number of bytes read

        cmp AX,0                                    ; compare number of read bytes with 0
        ; check if EOF
            jnz NotEOF                              ; if 0 bytes are read, we are at the end of the file
        ; if EOF

            ;st EOF flag to 1
            mov eof_flag, 1

            ; set current_line_end variable to new values
            mov ax, local_offset
            add current_line_end, ax
            mov current_line_size, ax

            ret
    
    NotEOF:
        xor cx, cx
        mov cx, ax
        mov bx, offset buffer

    CheckForEOL:
        mov ax, [bx]

        cmp al, 10 ;check if current char is newline
            jne ContinueCheckForEOL
        ; if we reached newline
            mov ax, local_offset
            add current_line_end, ax
            inc ax
            mov current_line_size, ax
            ret
    
    ContinueCheckForEOL:
        inc local_offset
        inc bx
        loop CheckForEOL

    jmp ReadNextChunk
    ret

read_next_line endp


;procedure that prints current date and time
print_datetime_p proc

    
    print_m data, paging_start ;print start string

    mov ah,2Ah          ; Get system date
    int 21h                 ; interrupt 21

    xor ax,ax               ; clear AX
    mov al,dl               ; get day
    call print_integer_p        ; print month
    
    print_m data, msg_dot   ;print dot
    
    mov ah,2Ah          ; Get system date
    int 21h

    xor ax,ax               ; clear AX
    mov al,dh               ; get month
    call print_integer_p        ; print month

    print_m data, msg_dot   ;print dot

    mov ah,2Ah          ; Get system date
    int 21h                 

    xor ax,ax               ; clear AX
    mov ax,cx               ; get year
    call print_integer_p        ; print year

    print_m data, space   ;print space

    mov ax,2C00h            ; Get system time
    int 21h                 

    xor ax,ax               ; clear AX
    mov al,ch               ; get hour
    call print_integer_p        ; print hour
    
    print_m data, msg_doubledot
    
    xor ax,ax               ; clear AX
    mov al,cl               ; get minute
    call print_integer_p        ; print minute
    
    print_m data, space	; print space
    print_m data, info ; information
    ret

print_datetime_p endp

; clears line and moves cursor to the beginning of it
clear_line_p proc
    
    mov cx, 60
del1:
    mov ah, 02h
    mov dl, 8
    int 21h
    dec cx
    cmp cx, 0
    jne del1

    mov cx, 60
del2:
    mov ah, 02h
    mov dl, 32
    int 21h
    dec cx
    cmp cx, 0
    jne del2

    mov cx, 60
del3:
    mov ah, 02h
    mov dl, 8
    int 21h
    dec cx
    cmp cx, 0
    jne del3

    ret

clear_line_p endp

paging_p proc
    ; push ax-dx register values to stack
    push ax
    push bx
    push cx
    push dx

    cmp count_mode, 0      ;if there are no next pages to display, finish paging
    je EndPagingProcedure


    call print_datetime_p		; otherwise wait for input to display next page

    mov ax,0700h                ; read and echo character
    int 21h

    call clear_line_p

EndPagingProcedure:

    mov paging_columns, 0
    mov paging_rows, 0

    ; retrieve values of registers in stack
    pop dx
    pop cx
    pop bx
    pop ax

    ret
paging_p endp

print_file_line_p proc  
	mov ax, line_count           ; move line count to ax register
	call print_integer_p         ; call procedure to print a number (of current line) 
	print_m data, space		     ; call macro to print space
	add line_count, 1
	
    mov ax, current_line_start   ;set ax to current line start
    call move_file_pointer_to_ax_p

    mov ax, current_line_size    ;set ax to current line size
    mov bytes_to_read, ax

    mov paging_columns, 0

    cmp bytes_to_read, 0
    je EndPrintLine

    ReadNextChunk_2:

        min_m bytes_to_read, BUFFER_SIZE ; return min to ax 

        mov bytes_read, ax

        sub bytes_to_read, ax
        mov bx, ax
        mov [buffer]+bx, '$'

        mov cx, ax                  ; bytes to read (used when reading from file)
        mov bx,file_handle          ; copy file_handle to BX (used when reading from file)
        mov ah,3fh                  ; DOS function: 3fh - Read from file or device, using a handle
        mov dx, offset buffer       ; address of buffer to read file 
        int 21h


        mov bx, offset buffer
        mov ax, bytes_read
        mov cx, ax
		
    
    print_chars_loop:
        mov ax, [bx]
        print_char_m al           ;print one character of line
        inc paging_columns

        cmp paging_columns, 80
        ; if line is shorter than 80 characters
            je LineOverflow
        ; if line is longer
            cmp paging_rows, 24
        ; check if we need next screen
            jne NoPagingCall
        ; if yes
            call paging_p


    LineOverflow:
		inc paging_rows
        mov paging_columns, 0   ;go to start of a line 

    NoPagingCall:
        inc bx
        dec cx
        jnz print_chars_loop


    cmp bytes_to_read, 0
    jg ReadNextChunk_2
    
    inc paging_rows
    cmp paging_rows, 24
    ; compare if we are at the bottom of a page
        jne EndPrintLine
    ; if yes, call paging
        call paging_p

    EndPrintLine:
        ret

print_file_line_p endp


close_file_p proc
    mov ah,3eh              ; close a File Handle in BX
    mov bx, file_handle     ; set BX to file_handle
    int 21h
    ret
close_file_p endp

main:
    call check_args_p                               ; Run procedure which checks all arguments and sets arg flags
    call open_file_p                                ; open file chosen by arguments
	mov line_count, 1
    MainLoop:
        call read_next_line					;read line of text file
        
        cmp eof_flag, 1
        ; if program reached EOF, finish
            je End_main
		call print_file_line_p                     ;print line we just read
        jmp MainLoop

    End_main:
        call print_file_line_p
        call close_file_p
        exit_m                                      ; call exit macro

code ends
end main
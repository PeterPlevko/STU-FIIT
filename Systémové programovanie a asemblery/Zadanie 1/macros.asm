;macro to find minimal value of two elements
min_m MACRO a, b
    cmp a, b            ; compare a and b
    jg a_greater        ;if a is greater jump to other part of code
    mov ax, a           ;move a to ax if a isn't greater 
    jmp min_m_end       ; jump to the end of macro   
a_greater:
    mov ax, b           ;move b to ax if a was greater
min_m_end:
    endm

;macro that prints string
print_m MACRO data_seg, msg
    mov ax,seg data_seg 
    mov ds,ax               ; set DS to data segment address
    mov ah,9                ; print string
    mov dx,offset msg       ; set DX to offset of msg in data segment
    int 21h                 ; DOS Serivce Calls
    endm    
    
;macro that prints a single character
print_char_m MACRO char
    mov ah,02h
    mov dl,char
    int 21h
    endm

    ;macro to exit program    
exit_m MACRO
    mov ah, 4ch             
    int 21h
    endm

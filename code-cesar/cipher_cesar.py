# --- FUNCIONES DE CIFRADO CÉSAR ---

def cifrar_cesar(texto, clave):

    resultado = ""

    for char in texto:
        if char.isupper():
            resultado += chr((ord(char) + clave - 65) % 26 + 65)
        elif char.islower():
            resultado += chr((ord(char) + clave - 97) % 26 + 97)
        else:
            resultado += char

    resultado=resultado+str(clave)
    return resultado
def descifrar_cesar(texto):

    resultado = ""
    clave=int(texto[-1])

    for char in texto:
        if char.isupper():
            resultado += chr((ord(char) - clave - 65) % 26 + 65)
        elif char.islower():
            resultado += chr((ord(char) - clave - 97) % 26 + 97)
        else:
            resultado += char
            
    resultado=resultado[:-1]
    return resultado

# print("Cifrado César")
# opt = input("Cifrar o descifrar: ")

# if opt.lower() == "cifrar" :
#     texto = input("Ingrese el texto a cifrar: ")
#     clave = int(input("Ingrese la clave (número entero): "))
#     texto_cifrado = cifrar_cesar(texto, clave)
#     print("Texto cifrado:", texto_cifrado)
#     exit()

# elif opt.lower() == "descifrar" :
#     texto = input("Ingrese el texto a descifrar: ")
#    #clave = int(input("Ingrese la clave (número entero): "))
#     texto_cifrado = descifrar_cesar(texto)
#     print("Texto descifrado:", texto_cifrado)
#     exit()
# else :
#     print("Opción no válida. Por favor, elija 'cifrar' o 'descifrar'.")
#     exit()   
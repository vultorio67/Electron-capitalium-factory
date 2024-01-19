import argparse
import subprocess

import minecraft_launcher_lib

"""
This python file is to install and generate command to launch the minecraft game
I do not find a methode in javascript wich is simple as using the minecraft_launcher_lib

Thanks  : https://pypi.org/project/minecraft-launcher-lib/

I just export this file to an executable with the librari pyinstaller, this is the main.exe
"""

# Taken from https://stackoverflow.com/questions/3173320/text-progress-bar-in-the-console
def printProgressBar(iteration, total, prefix='', suffix='', decimals=1, length=100, fill='█', printEnd="\r"):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
        printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    print("percent: ", percent)
    # Print New Line on Complete
    if iteration == total:
        print()


def maximum(max_value, value):
    max_value[0] = value


def installer_version(version, type_installe, emplacement):
    if type_installe == "vanilla":
        max_value = [0]
        callback = {
            "setStatus": lambda text: print(text),
            "setProgress": lambda value: printProgressBar(value, max_value[0]),
            "setMax": lambda value: maximum(max_value, value)
        }
        minecraft_launcher_lib.install.install_minecraft_version(version, emplacement, callback=callback)

    if type_installe == "forge":
        max_value = [0]
        callback = {
            "setStatus": lambda text: print(text),
            "setProgress": lambda value: printProgressBar(value, max_value[0]),
            "setMax": lambda value: maximum(max_value, value)
        }
        minecraft_launcher_lib.forge.install_forge_version(version, emplacement, callback=callback)

def lancer_version(version, emplacement, name, uuid, token, java_executable, ram_min, ram_max):
    options = {
        "username": name,
        "uuid": uuid,
        "token": token,
    }

    if java_executable == "default":
        pass
    else:
        options["executablePath"] = "path/to/java"

    options["jvmArguments"] = ["-Xmx"+ram_max+"G", "-Xms"+ram_min+"G"]

    minecraft_command = minecraft_launcher_lib.command.get_minecraft_command(version, emplacement,
                                                                             options)
    print(minecraft_command)

# Configuration de l'analyseur d'arguments
parser = argparse.ArgumentParser(description="Programme Python pour installer et lancer des versions de Minecraft.")

# Ajout de l'option d'installation
parser.add_argument('--install', action='store_true', help='Installer une version de Minecraft')
parser.add_argument('--version', help='Version de Minecraft à installer')
parser.add_argument('--type', help='Type d\'installation')
parser.add_argument('--emplacement', help='Emplacement de l\'installation')

# Ajout de l'option de lancement
parser.add_argument('--launch', action='store_true', help='Lancer une version de Minecraft')
parser.add_argument('--name', help='Nom de l\'utilisateur')
parser.add_argument('--uuid', help='UUID de l\'utilisateur')
parser.add_argument('--token', help='Token d\'authentification de l\'utilisateur')
parser.add_argument('--javaExecutable', help='Chemin vers l\'exécutable Java')
parser.add_argument('--ramMin', help='Quantité minimale de RAM à allouer')
parser.add_argument('--ramMax', help='Quantité maximale de RAM à allouer')

# Analyse des arguments de la ligne de commande
args = parser.parse_args()

# Exécution de la fonction appropriée en fonction des arguments
if args.install:
    if args.version and args.type and args.emplacement:
        installer_version(args.version, args.type, args.emplacement)
    else:
        print("L'option --install nécessite les arguments --version, --type et --emplacement.")
elif args.launch:
    if args.version and args.emplacement and args.name and args.uuid and args.token and args.javaExecutable and args.ramMin and args.ramMax:
        lancer_version(args.version, args.emplacement, args.name, args.uuid, args.token, args.javaExecutable, args.ramMin, args.ramMax)
    else:
        print("L'option --launch nécessite les arguments --version, --emplacement, --name, --uuid, --token, --javaExecutable, --ramMin et --ramMax.")
else:
    print("Aucune option spécifiée. Utilisez --install ou --launch.")



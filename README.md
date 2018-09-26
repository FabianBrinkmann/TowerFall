# TowerFall
Bei dieser Anwendung handelt es sich um ein Browserspiel.
Momentan ist das Spiel nur lokal mit 2 Personen spielbar.

##Das Spiel zum Laufen bringen

###Starten des Backends
Um das Spiel zu starten muss zunächst der Backend-Webserver zum Laufen gebracht werden.
Hierfür müssen folgende Schritte befolgt werden:

- Dotnet core 2.1 SDK und runtime installieren (https://www.microsoft.com/net/download) 
- Server Verzeichnis öffnen (TowerFall/Server/Server)
- build.cmd ausführen 
- run.cmd ausführen


###Starten des Frontends
Wenn das Backend läuft, muss das Phaser-Projekt über einen Webserver(z.B. Appache, Tomcat, etc.) getstartet werden.
Auf Grund von Browsersicherheitskonfigurationen ist es leider nicht möglich, den HTML-Code direkt im Browser zu öffnen.
Mehr Infos hier zu auf: https://phaser.io/tutorials/getting-started-phaser3.
Hierbei muss die Datei Game.html (Pfad: TowerFall/Phaser/Game.html) vom Webserver gehosted werden.
Ggf. muss je Nach Webserver alternativ der Ordner, in welcher die Game.html sich befindet, als Root-Source-Directory gesetzt werden.


###Spiel starten
Wenn der Webserver gestartet wurde, kann das Spiel im Browser über den Localhost geöffnet werden.
(Link: http://localhost:**[Webserverport]**/TowerFall/Phaser/Game.html)

####Ein Spiel beginnen
1. Wenn man noch nie gespielt hat, muss man sich registrieren (klicke "register here").
2. Anschließend muss man sich mit dem registrierten Benutzer einloggen.
3. Über Options kann folgendes eingestellt werden:
   - die Spielumgebung (Map)
   - der Spielername und ein Spielchrackter für beide Spieler
   - die Aktivierung/Deaktivierung von Soundeffekten und Musik 
4. Über Start wird das Spiel gestartet.


####Das Spiel
- Sinn des Spiels ist es den jeweils anderen Spieler abzuschießen.
- Ein Treffer genügt im Normalfall zum Sieg.
- Jeder Spieler hat zu Beginn 3 Schüsse.
- Munition kann durch darüber laufen wieder eingesammelt werden. Egal ob eigene oder die des Gegners.
- Wenn der Spieler ein Herz-Item einsammelt, hat er ein extra Leben.  
- Wenn der Spieler ein Munitions-Item einsammelt, hat er 2 Extraschüsse.  

#####Steuerung:
- **[ESC]:** Öffnet ein Ingame-Menu für Restart und Sound/Musik Aktivierung/Deaktivierung. Funktionen sind anklickbar und Restart zusätzlich über **[R]** ausführbar im Menü.
- **[A] [W] [D]:** Bewegung von Spieler 1.
- **[Shift]:** Schießen von Spieler 1.
- **[←] [↑] [→]:** Bewegung von Spieler 2.
- **[Space]:** Schießen von Spieler 2.

###Anmerkungen: 
- Die Dateien im Ordner node_modules gehören zum Phaser-Framework und wurden nicht von uns geschrieben.
- Die Sounds/Musik sind lizensfrei erworben und wurden zum Teil von uns gekürzt und/oder von der Lautstärke her angepasst.
- Die Grafiken/Bilder wurden von uns selber kreiert, mit Ausnahme des Bildes TowerFall.png (Pfad: TowerFall\Phaser\assets\tilemaps\tiles\TowerFall.png)
- Sollte aus irgendwelchen Gründen das Backend mit der Datenbank nicht funktionieren, kann (als letzte Lösung!) der Login mit einer Sicherheitslücke umgangen werden:
    - Spiel-Frontend starten und im Browser öffnen.
    - Browser-Konsole öffnen und folgenden Code ausführen:
     
            window.sessionStorage.setItem('token','xyz');
    - Seite neuladen.        
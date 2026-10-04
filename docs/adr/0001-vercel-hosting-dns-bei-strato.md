# Hosting auf Vercel, DNS und Mail bleiben bei Strato

Die Website (Next.js mit Headless CMS) läuft auf Vercel, weil der Strato-Webspace kein Node.js ausführt und ein statischer Export bei jeder Inhaltsänderung einen manuellen Build und Upload erfordern würde. Die Domain holderle.de bleibt bei Strato: Nameserver und MX-Records (smtpin.rzone.de) werden nicht umgezogen, damit die E-Mail-Adressen unverändert funktionieren. Stattdessen zeigen der A-Record von holderle.de und ein CNAME für www auf Vercel – kein HTTP-Redirect, damit die Adresse im Browser holderle.de bleibt.

## Consequences

Altprojekte, die bisher als Unterverzeichnisse auf dem Strato-Webspace lagen (/wetter-getter/, /pop-up/, /study-card/), sind unter holderle.de nicht mehr erreichbar. Sie ziehen auf Strato-Subdomains um (wie bereits beatbuster.holderle.de); die alten Pfade leiten per Redirect von Vercel dorthin weiter. Ausnahme: Studycard ist bereits offline und wird nicht wiederbelebt; /study-card/ leitet auf die Startseite.

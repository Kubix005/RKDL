# RKDL
Rodzinka Kicka Demon List

## Legacy levele

Aby ukryć level z widocznych list, dodaj do jego wpisu w `levels.json` pole `"legacy": "true"`. Wpis pozostanie w pliku, ale nie będzie wyświetlany ani uwzględniany w aktywnych punktach RK. Pole może też mieć wartość logiczną `true`.

## Predykcja levela

Strona `prediction.html` przyjmuje numeryczne ID levela z adresu AREDL i sprawdza jego aktualną pozycję na głównej liście AREDL. Na tej podstawie przewiduje miejsce levela w RKDL oraz punkty RK według aktualnego wzoru punktacji. To szacunek oparty na rankingu AREDL, nie ręczna ocena trudności RKDL.

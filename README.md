# $bog_fragile

Что ломается у наследников и владельцев компонента на $mol, когда автор компонента его переделал.

Два коммита. В `v1` базовые компоненты как были, в `v2` их переделали. Наследников и владельцев между коммитами не трогали, `git diff v1 v2 --stat` показывает только `base` и `widget`.

## Запуск

```bash
git clone https://github.com/hyoo-ru/mam.git && cd mam
git clone https://github.com/b-on-g/fragile.git bog/fragile
npm install
git -C bog/fragile checkout v1 && bog/fragile/check.sh
git -C bog/fragile checkout v2 && bog/fragile/check.sh
```

`check.sh` собирает каждый случай разовым `npx mam` (тайпчек + тесты) и печатает, что в итоге отрендерилось.

## Случаи

| Случай | Что сделали в `v2` | Чем поймано |
|---|---|---|
| `outer` | владелец задаёт `city` у вложенного виджета, виджет переименовал `city` в `location` | TS2339 |
| `retype` | наследник задаёт `limit 5`, база сменила тип `limit` на строку | TS2416 |
| `rename/ts` | наследник в `view.ts` пишет `override heading()`, база переименовала `heading` в `caption` | TS4113 |
| `rename/tree` | то же, но наследник задаёт `heading` во `view.tree` | только тест |
| `collide/child` | у наследника своё `icon`, база завела `icon` под другое | ничем |
| `collide/named` | то же, но у наследника `attach_icon` | не ломается |
| `spread/plain` | наследник перечислил содержимое базы руками, база добавила `Head` | ничем |
| `spread/keep` | наследник взял содержимое базы через `^` | не ломается |

Вывод `check.sh` на `v2`:

```
# build
outer/page     error TS2339: Property 'city' does not exist on type '$bog_fragile_outer_widget'.
rename/tree    Equality assertion failure
rename/ts      error TS4113: This member cannot have an 'override' modifier because it is not declared in the base class '$bog_fragile_rename_ts'.
retype/child   error TS2416: Property 'limit' in type '$bog_fragile_retype_child' is not assignable to the same property in base type '$bog_fragile_retype_base'.
collide/child  ok
collide/named  ok
spread/plain   ok
spread/keep    ok
# rendered
outer/page     [ 'Москва' ]
rename/tree    [ 'База' ]
rename/ts      [ 'База' ]
retype/child   [ 5 ]
collide/child  [ '📎', 'Файл', '📎' ]
collide/named  [ '🔔', 'Файл', '📎' ]
spread/plain   [ 'Тело', 'Ещё' ]
spread/keep    [ 'Шапка', 'Тело', 'Ещё' ]
```

Аудит дев-сервера (`localhost:9080/.../-/web.audit.js`) для этой проверки не годится: он держит TS-программу с момента старта и после переключения коммита может показать зелёное на сломанном коде.

# ![Software Plumbers](http://docs.softwareplumbers.com/common/img/SquareIdent-160.png) Tristate Logig

Library for working with tri-state (true/false/null) logic in javascript

## Rationale

Tri-state logic is occasionally more useful than strict boolean logic, as it handles the real world
case where the truth of some propositions is unknown. Most SQL databases in fact implement a form of 
tri-state logic. For example, the WHERE clause `a = b OR c = d` will return results if a is null so
long as c = d, because 'UKNOWN or TRUE' is deemed TRUE.

Truth tables for classic tri-state logic are below:

|a		|b		| AND   |
|-------|-------|-------|
|TRUE	|TRUE	|TRUE	|
|TRUE	|FALSE	|TRUE	|
|FALSE	|TRUE	|TRUE	|
|FALSE	|FALSE	|FALSE	|
|UNKNOWN|FALSE	|UNKNOWN|
|UNKNOWN|TRUE	|TRUE	|
|FALSE	|UNKNOWN|UNKNOWN|
|TRUE	|UNKNOWN|TRUE	|
|UNKNOWN|UNKNOWN|UNKNOWN|

|a		|b		| OR	|
|-------|-------|-------|
|TRUE	|TRUE	|TRUE	|
|TRUE	|FALSE	|FALSE	|
|FALSE	|TRUE	|FALSE	|
|FALSE	|FALSE	|FALSE	|
|UNKNOWN|FALSE	|FALSE	|
|UNKNOWN|TRUE	|UNKNOWN|
|FALSE	|UNKNOWN|FALSE	|
|TRUE	|UNKNOWN|UNKNOWN|
|UNKNOWN|UNKNOWN|UNKNOWN|

If we map 'UKNOWN' to 'null' in javascript, the behaviour of the standard operators is frustratingly close to the above:

|a		|b		|a && b	| AND 	|
|-------|-------|-------|-------|
|false	|false	|false	|false	|
|false	|true	|false	|false	|
|true	|false	|false	|false	|
|true	|true	|true	|true	|
|null	|true	|null	|null	|
|null	|false	|_null_	|_false_|
|true	|null	|null	|null	|
|false	|null	|false	|false	|
|null	|null	|null	|null	|

|a		|b		|a || b	| OR    |
|-------|-------|-------|-------|
|false	|false	|false	|false	|
|false	|true	|true	|true	|
|true	|false	|true	|true	|
|true	|true	|true	|true	|
|null	|true	|true	|true	|
|null	|false	|_false_|_null_ |
|true	|null	|true	|true	|
|false	|null	|null	|null	|
|null	|null	|null	|null	|

The exceptions (in italics) unfortunately break some important cases; for if we want to iterate over a collection
until some condition is _definitely_ false, being unable to reliably destinguish between 'unknown' and 'false' 
is a problem.

## Example

```javascript
let result1 = and(null, false)
let result2 = or(null, false)
```

and result1 should equal `false` while result2 equals `null`. In other cases `and(a,b) === a && b`.

These simple binary and and or functions have to do some extra checks and comparisons in order to work. Some additional API is defined, which can be (very, very, slightly) more efficient and more explicit.

```javascript
let a = FALSE;
let b = TRUE;
let c = UNKNOWN;

if (a.and(c) === FALSE) console.log('hello'); 
```

will log 'hello'.

For the latest API documentation see [The Software Plumbers Site](http://docs.softwareplumbers.com/tristate/master)

## Project Status

Beta. It seems functional, and the unit tests pass.   













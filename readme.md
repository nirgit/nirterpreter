# Nirterpreter
## An experimental interpreter for a made up programming language.

#### <u>Build status</u>:
[![Build Status](https://travis-ci.org/nirgit/nirterpreter.svg?branch=master)](https://travis-ci.org/nirgit/nirterpreter)

<br>


### How to use
--------------------------

* Run `npm start` to start the REPL in the terminal
* Run `npm test` to run the tests


<br>
<br>
<br>


### Program Example
----------------------------

#### Example 1
Print numbers 1 to 10 in *REPL*
```javascript
do(define(x,1), while(<(x, 10), do(print(x), define(x, +(x,1)))))
```

#### Example 2
The program below will declare 2 variables, x & y, and will
print and increment x by 2 in a loop until it equals to y or greater than y.
And finally it will print "hurray" on the screen if x is bigger than 18.

```javascript
    do(
        define(x, 7), 
        define(y, 18),
        while(<(x, y), do(
            print(x),
            define(x, +(x, 2))
        )),
        if(>(x, 18), do(
            print("hurray")
        ))
    )
```

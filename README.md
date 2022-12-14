# Triage Tool for Issues Identified by Static Analysis


> In medicine, triage (/ˈtriːɑːʒ, triˈɑːʒ/) is a practice invoked when acute care cannot be provided for lack of resources. The process rations care towards those who are most in need of immediate care, and who benefit most from it. 
 
-- [Wikipedia](https://en.wikipedia.org/wiki/Triage#:~:text=In%20medicine%2C%20triage%20(/%CB%88tri%CB%90%C9%91%CB%90%CA%92%2C%20tri%CB%88%C9%91%CB%90%CA%92/)%20is%20a%20practice%20invoked%20when%20acute%20care%20cannot%20be%20provided%20for%20lack%20of%20resources.%20The%20process%20rations%20care%20towards%20those%20who%20are%20most%20in%20need%20of%20immediate%20care%2C%20and%20who%20benefit%20most%20from%20it)

Sometimes there are so many problems you just don't know where to start.

The goal of this tool is to provide a means of _categorizing_ and identifying the _multitude_ of problems that other static analysis tools may find for a target javascript project.

NOTE: This is a 'personal tool' that will change as my needs change. Unless you are me, or have direct access to me to act as a guide, this project should be used with caution. Take from it what appears interesting, I offer no support or guarantees. I expect this code to evolve rapidly and unexpectedly in different directions.

Target Project Dependencies:
- typescript config 
- eslint config (planned)

## Usage

1. Download typescript error messages
```sh
$ ./scripts/dl-ts-error-codes.sh
```

2. Create Reports

(Inspect the script for full list of options)

```sh
$ ./scripts/report.ts
```

## TODO
- Add eslint support
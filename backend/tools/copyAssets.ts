import * as shell from "shelljs";
try {
  const dirs = shell.ls("-d", "src/*/");
  dirs.forEach((element) => {
    shell.cp("-R", element, "dist/");
  });

// tslint:disable-next-line: no-empty
} catch ( err ) {
  // tslint:disable-next-line: no-console
  console.log("No Directories found in src");
}

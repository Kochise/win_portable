# Why Test Extensions

Previously, Inkscape extensions were not tested for quality or correctness. But since 1.0, the extensions repository is far more strict about requiring tests and requiring tests to pass before changes can be merged in.

You may find yourself being frustrated by the tests, especially if at first it doesn't make sense why they are failing. But these tests are important and I ask that everyone be as kind as they can to make sure the quality of the repository is maintained.

# Running Tests

You must install the program `pytest` in order to run these tests. Both Pytest and Pytest-Coverage are required to run tests.

Usually the best way to install it is: 

```shell
$ pip3 install pytest pytest-cov
```

You may run all tests by omitting any other parameters or select tests by adding the test filename that you want to run.

```shell
$ pytest
$ pytest tests/test_my_extension.py
```

You can also run tests until the first time they fail, and ask pytest to run the previously failed tests first. This can cut down how long pytest takes to run before hitting a failure.

```shell
$ pytest -x --ff
```

More info here: https://docs.pytest.org/en/latest/getting-started.html

# Test Files

Each extension should have its own test file in the tests directory. This test may be a series of function tests or "comparison" tests. The comparison tests will fail whenever the output of an extension changes, so often they will need to be updated to reflect your changes.

Usually the test file will be named `tests/test_{name_of_extension}.py` using the same name as the extension file itself. For tests covering inkex and other modules you may find test files have the format `tests/test_{package}_{module}.py` or similar.

Each test can be run independently as shown in the previous section.

# Test Data

As well as python test files, each test will normally depend on additional data. From source svg files, to output comparison tests and other such things.

This data is always held in `tests/data`, when writing tests, please make sure your data goes into the right directory. If you are updating the comparison test, usually you just need to rename the `export` file generated and remove the `.export` suffix to enable it.

See tests/data/README.md for further information.

# Writing or Updating tests

You need to read the documentation available inside the tester module to learn how to write tests, or what the test code means. From a python3 terminal type:

```python
from inkex import tester
help(tester)
```

# Coverage

Coverage reports tell us how much of an extension is being exercised when tests are run.

The latest coverage report for master branch can be found at
https://inkscape.gitlab.io/extensions/coverage/.

To run a complete coverage report, you can specify the `--cov=.` option like so:

```shell
$ pytest --cov=. --cov-report term
```

For a single extension coverage report, you can limit it further with:

```shell
$ pytest --cov=my_extension.py --cov-report term
```

## Testing Options

Tests can be run with these options that are provided as environment variables:

    FAIL_ON_DEPRECATION=1 - Will instantly fail any use of deprecated APIs
    EXPORT_COMPARE=1 - Generate output files from comparisons. This is useful for manually checking the output as well as updating the comparison data.
    NO_MOCK_COMMANDS=1 - Instead of using the mock data, actually call commands. This will also generate the msg files similar to export compare.
    INKSCAPE_COMMAND=/other/inkscape - Use a different Inkscape (for example development version) while running commands. Works outside of tests too.
    XML_DIFF=1 - Attempt to output an XML diff file, this can be useful for debugging to see differences in context.
    DEBUG_KEY=1 - Export mock file keys for debugging. This is a highly specialised option for debugging key generation.

For example:

```shell
$ EXPORT_COMPARE=1 pytest
```

or

```shell
export EXPORT_COMPARE=1
pytest
```

# Testing custom extensions

The same testing framework can be used in your own extension repositories by requiring the inkex module and using the inkex.tester module set. It should be available with Inkscape or can be installed via pypi.

This is a great way of ensuring you have access to the same tools Inkscape uses to test, and makes it easier for your external extension to make its way to the core repository without resistance.

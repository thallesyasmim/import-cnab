Feature: Import CNAB file with financial transactions data

        When the user imports the CNAB file
    I want the system to import the data
    For information to be displayed on screen

    Scenario: Import CNAB file

        Given the file was imported
        Then the system should normalize the data
        And store them in a relational database
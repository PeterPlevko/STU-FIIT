<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://sipvs-projekt.com/sipvs-teamABBBC"
    xmlns:tns="http://sipvs-projekt.com/sipvs-teamABBBC"
    exclude-result-prefixes="tns">

    <xsl:template match="/tns:form">
        <html>
            <head>
                <meta charset="utf-8" />
                <title>Rezervácia športovej haly</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    }

                    h1 {
                    color: #333;
                    text-align: center;
                    margin-top: 50px;
                    }

                    body div.form {
                    width: 500px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
                    }

                    p {
                    margin-bottom: 15px;
                    }

                    input[type="text"], input[type="date"], input[type="email"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    }

                    input[type="submit"] {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    border: none;
                    background-color: #333;
                    color: #fff;
                    border-radius: 4px;
                    cursor: pointer;
                    }

                    input[type="submit"]:hover {
                    background-color: #444;
                    }

                    .reservations-wrapper {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin: 20px 0;
                    background-color: #f9f9f9;
                    }

                    .reservation {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin-bottom: 10px;
                    background-color: #fff;
                    }

                    #reservations p span {
                    opacity: 0.5;
                    font-size: 12px;
                    }
                </style>
            </head>

            <body>
                <h1>Rezervácia športovej haly</h1>
                <hr />
                <div class="form">
                    <p>Meno: <input type="text" disabled="true" value="{tns:first-name}" /></p>
                    <p>Priezvisko: <input type="text" disabled="true" value="{tns:last-name}" /></p>
                    <p>Email: <input type="text" disabled="true" value="{tns:email-address}" /></p>
                    <p>Dátum rezervácie: <input type="date" disabled="true" value="{tns:reservation-date}" /></p>
                    <p>Zapožičanie nástrojov: <input type="text" disabled="true" value="{tns:wants-equipment}" /></p>
                    <div class="reservations-wrapper">
                        <p>Zoznam rezervácií</p>
                        <xsl:apply-templates select="tns:reservations" />
                    </div>
                </div>
            </body>

        </html>
    </xsl:template>

    <xsl:template match="tns:reservations">
        <div class="reservations">
            <xsl:apply-templates select="tns:reservation" />
        </div>
    </xsl:template>

    <xsl:template match="tns:reservation">
        <div class="reservation">
            <p>Meno športovca: <input type="text" disabled="true"
                    value="{tns:sportsman-name}" /></p>
            <p>Číslo kurtu: <input type="integer" disabled="true"
                    value="{tns:court-number}" /></p>
        </div>
    </xsl:template>

</xsl:stylesheet>

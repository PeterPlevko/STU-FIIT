<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output
            method="html"
            encoding="UTF-8"
            indent="yes"
    />
    <!--Hlavny template ktory obsahuje dve tabulky a dva jednoduche zoznamy-->
    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;
        </xsl:text>

        <html>
            <head>
                <!--Importujem oba css subory pre print a screen media-->
                <link rel="stylesheet" type="text/css" media="screen" href="screen_style.css"/>
                <link rel="stylesheet" type="text/css" media="print" href="print_style.css"/>
                <title>Olympics</title>
            </head>
            <h1>Athletes bulletin</h1>
            <body>
                <h2>Male athletes</h2>

                <!--Tabulka muzskych atletov-->
                <table class="table1">
                    <head>
                        <tr>
                            <th>Name</th>
                            <th>Date of birth</th>
                            <th>Sport</th>
                            <th>Country</th>
                            <th>Total olympic starts</th>
                            <th>Olympic starts</th>
                        </tr>
                    </head>
                    <tbody>
                        <xsl:apply-templates select="olympics/athletes/athlete[@sex='male']">
                            <xsl:sort select="name"/>
                        </xsl:apply-templates>

                    </tbody>

                </table>

                <br/>
                <h2>Women athletes</h2>
                <!--Tabulka sportovkyn-->
                <table class="table2">

                    <head>
                        <tr>
                            <th>Name</th>
                            <th>Date of birth</th>
                            <th>Sport</th>
                            <th>Country</th>
                            <th>Total olympic starts</th>
                            <th>Olympic starts</th>
                            <th>Informations</th>
                        </tr>
                    </head>
                    <tbody>
                        <xsl:apply-templates select="olympics/athletes/athlete[@sex='female']">
                            <xsl:sort select="name"/>
                        </xsl:apply-templates>
                    </tbody>
                </table>
                <br/>
                <h2>Special informations</h2>
                <!--Zoznam kde pomocou netrivialneho xpath vyrazu vyberiem atletov ktori pretekaju v letnom sporte, su zenati a existuju o nich informacie -->
                <div class="div-left">

                    <h3>These athletes are married and compete in summer sport</h3>
                    <xsl:apply-templates
                            select="//athlete[informations[count(additional-info)>0 and @status='married'] and sport/@type-of-sport='summer']"
                            mode="personal-info"/>
                </div>
                <!--Zoznam kde vyberam kazdeho parneho sportovca v dokumente ktory ma trenera-->
                <div class="div-right">
                    <h3>These are head-coaches of athletes</h3>
                    <xsl:apply-templates
                            select="//athlete[(position() mod 2=1) and @trainers-name]"
                            mode="trainers"/>
                </div>

            </body>
        </html>
    </xsl:template>

    <!--template kde naplnim tabulky a kde overujem ci sa jedna o zenu alebo muza-->
    <xsl:template match="athlete">
        <xsl:variable name="sex" select="@sex"/>
        <!--Vyberiem zelane hodnoty a vlozim ich do tabulky-->
        <tr>
            <td class="name">
                <xsl:value-of select="name"/>
            </td>
            <td>
                <xsl:value-of select="date-of-birth"/>
            </td>
            <td>
                <xsl:value-of select="sport/name-of-sport"/>
            </td>
            <td>
                <xsl:value-of select="country/name-of-country"/>
            </td>

            <td class="starts-count">
                <!--zavolam pomocny template s parametrom startcount reprezentujucim pocet olympijskych startov-->
                <xsl:call-template name="start_count">
                    <xsl:with-param name="count">
                        <xsl:value-of select="count(.//start)"/>
                    </xsl:with-param>
                </xsl:call-template>
            </td>
            <td class="starts">
                <!--aplikujem pomocny template pomocou ktoreho zistim vsetky starty na OH-->
                <xsl:apply-templates select="olympic-starts/start"/>
            </td>
            <!--pokial je aktualny uzol athlete o zene tak pridam kolonku informacie kde vypisem vsetky dostupne informacie-->
            <xsl:if test="$sex='female'">
                <td class="starts">
                    <ul>
                        <xsl:for-each select="informations/additional-info">
                            <li>
                                <xsl:attribute name="style">
                                    color:#ff6600;
                                    font-weight:bold;
                                </xsl:attribute>
                                <xsl:value-of select="."/>
                            </li>
                        </xsl:for-each>
                        <!--pokial neexistuju informacie tak vytlacim velkym cervenym ze ziadne neexistuju-->
                        <xsl:if test="count(informations/additional-info)=0">
                            <li class="red">
                                <xsl:attribute name="style">
                                    color:red
                                </xsl:attribute>
                                <xsl:text>Informations do not exist</xsl:text>
                            </li>
                        </xsl:if>
                    </ul>
                </td>
            </xsl:if>
        </tr>
    </xsl:template>
    <!--pomocny template start kde z elementu start vyberam mesto a rok konania jednotlivych OH-->
    <xsl:template match="start">
        <xsl:element name="ul">
            <xsl:element name="li">
                <xsl:value-of select="city"/>
            </xsl:element>
            <xsl:element name="li">
                <xsl:value-of select="year"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>

    <!--pomocny template kde vypisujem nastylovane mena trenerov a ich zverencov do listu-->
    <xsl:template match="athlete" mode="trainers">
        <xsl:variable name="trainers-name" select="@trainers-name"/>
        <xsl:element name="ul">
            <xsl:element name="li">
                <xsl:attribute name="style">
                    font-weight:bold;
                </xsl:attribute>

                <xsl:value-of select="name"/>
            </xsl:element>
            <xsl:element name="li">
                <xsl:attribute name="style">
                    font-style:italic;
                </xsl:attribute>

                <xsl:value-of select="$trainers-name"/>
            </xsl:element>
        </xsl:element>
    </xsl:template>
    <!--template sluziaci na zobrazenie poct startov na olympijskych hrach podla poctu startov sa zmeni aj farba-->
    <xsl:template name="start_count">
        <xsl:param name="count"/>
        <span>
            <xsl:attribute name="style">
                <xsl:choose>
                    <xsl:when test="$count = 1">
                        color: blue;
                    </xsl:when>
                    <xsl:when test="$count = 2">
                        color: red;
                    </xsl:when>
                    <xsl:when test="$count = 3">
                        color: green;
                    </xsl:when>
                    <xsl:when test="$count = 4">
                        color: #ff6600;
                    </xsl:when>
                    <xsl:otherwise>
                        color: black;
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
            <xsl:value-of select="$count"/>
        </span>
    </xsl:template>
    <!--Template kde naplnam list informaciami o vyske a vahe vybraneho atleta-->
    <xsl:template match="athlete" mode="personal-info">
        <!--vyuzivam premenne pre porovnavanie vysky a vahy s idealnymi hodnotami-->
        <xsl:variable name="height" select="informations/@height"/>
        <xsl:variable name="weight" select="informations/@weight"/>
        <span>
            <xsl:element name="ul">
                <xsl:value-of select="name"/>
                <xsl:text>- Height: </xsl:text>
                <span>
                    <xsl:if test="$height>185">
                        <xsl:attribute name="style">
                            color:red;
                            font-weight:bold;
                        </xsl:attribute>

                    </xsl:if>
                    <xsl:value-of select="$height"/>
                </span>
                <xsl:text> Weight: </xsl:text>
                <span>
                    <xsl:if test="$weight>80">
                        <xsl:attribute name="style">
                            color:red;
                            font-weight:bold;
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:value-of select="$weight"/>
                </span>
            </xsl:element>
        </span>
    </xsl:template>
</xsl:stylesheet>

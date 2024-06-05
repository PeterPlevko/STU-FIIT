<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output
            method="xml"
            encoding="UTF-8"
            indent="yes"
    />
    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;
        </xsl:text>
        <svg
                viewBox="0 0 1300 1300"
                role="img"
                version="1.1"
                baseProfile="full"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <title id="title">Stĺpcový graf - Olympíjskych štartov športovcov</title>
            <desc id="desc">Počty štartov športovcov v buletíne na olympijských hrách v jednotlivých rokoch.</desc>

            <!-- Vykreslovanie osi -->
            <g stroke="#000" stroke-width="1" font-size="18" font-family="Helvetica">
                <!-- Y globalny posun podla osi y -->
                <g transform="translate(100, 100)">
                    <!--  hlavna os Y -->
                    <line x1="0" x2="0" y1="50" y2="600" style="stroke-width:3;stroke:rgb(0,0,0)"/>

                    <!-- male pomlcky pred grafom na stitky osi Y -->
                    <line x1="-7" x2="0" y1="100" y2="100"/>
                    <line x1="-7" x2="0" y1="200" y2="200"/>
                    <line x1="-7" x2="0" y1="300" y2="300"/>
                    <line x1="-7" x2="0" y1="400" y2="400"/>
                    <line x1="-7" x2="0" y1="500" y2="500"/>

                    <!-- prerusovane ciary -->
                    <g stroke="#aaa" stroke-dasharray="10 10">
                        <line x1="0" x2="1150" y1="100" y2="100"/>
                        <line x1="0" x2="1150" y1="200" y2="200"/>
                        <line x1="0" x2="1150" y1="300" y2="300"/>
                        <line x1="0" x2="1150" y1="400" y2="400"/>
                        <line x1="0" x2="1150" y1="500" y2="500"/>
                    </g>

                    <!--  stitky jednotlivych hodnot na osi Y-->
                    <g text-anchor="end" dominant-baseline="middle">
                        <text x="-10" y="100">5</text>
                        <text x="-10" y="200">4</text>
                        <text x="-10" y="300">3</text>
                        <text x="-10" y="400">2</text>
                        <text x="-10" y="500">1</text>
                    </g>

                    <!-- pomenovanie osi Y -->
                    <text x="-50" y="320" text-anchor="middle" dominant-baseline="middle" font-size="18"
                          font-weight="bold" transform="rotate(-90, -50, 320)">Počet štartov
                    </text>
                </g>

                <!-- globalny posun podla osi X -->
                <g transform="translate(75, 700)">
                    <!--  hlavna os X -->
                    <line x1="24" x2="1175" y1="0" y2="0" style="stroke-width:3;stroke:rgb(0,0,0)"/>
                    <!-- male pomlcky pred grafom na stitky osi X -->
                    <line x1="100" x2="100" y1="7" y2="0"/>
                    <line x1="200" x2="200" y1="7" y2="0"/>
                    <line x1="300" x2="300" y1="7" y2="0"/>
                    <line x1="400" x2="400" y1="7" y2="0"/>
                    <line x1="500" x2="500" y1="7" y2="0"/>
                    <line x1="600" x2="600" y1="7" y2="0"/>
                    <line x1="700" x2="700" y1="7" y2="0"/>
                    <line x1="800" x2="800" y1="7" y2="0"/>
                    <line x1="900" x2="900" y1="7" y2="0"/>
                    <line x1="1000" x2="1000" y1="7" y2="0"/>
                    <line x1="1100" x2="1100" y1="7" y2="0"/>
                    <!--  stitky jednotlivych hodnot na osi X-->
                    <g text-anchor="end">
                        <text x="100" y="30" transform="rotate(-30, 100, 30)">2000</text>
                        <text x="200" y="30" transform="rotate(-30, 200, 30)">2002</text>
                        <text x="300" y="30" transform="rotate(-30, 300, 30)">2004</text>
                        <text x="400" y="30" transform="rotate(-30, 400, 30)">2006</text>
                        <text x="500" y="30" transform="rotate(-30, 500, 30)">2008</text>
                        <text x="600" y="30" transform="rotate(-30, 600, 30)">2010</text>
                        <text x="700" y="30" transform="rotate(-30, 700, 30)">2012</text>
                        <text x="800" y="30" transform="rotate(-30, 800, 30)">2014</text>
                        <text x="900" y="30" transform="rotate(-30, 900, 30)">2016</text>
                        <text x="1000" y="30" transform="rotate(-30, 1000, 30)">2018</text>
                        <text x="1100" y="30" transform="rotate(-30, 1100, 30)">2020</text>
                    </g>

                    <!-- pomenovanie osi Y -->
                    <text x="600" y="100" text-anchor="middle" font-size="18" font-weight="bold">Rok konania
                        olympíjskych hier
                    </text>
                </g>
            </g>

            <!-- jednotlive stlpce grafov dynamicky pocitam vysku a y suradnicu teda odkial vykreslim stlpec -->
            <!-- nastavim im aj styl v podobe cierneho ohranicenia so sirkou 2-->
            <!-- pri vykreslovani oblznikov postupujem rovnako-->
            <g transform="translate(75, 200)" stroke="#000" stroke-width="2">
                <!-- farby obdlznikov su podla toho ci sa jedna o zimnu alebo letnu olympiadu-->
                <rect x="80" width="40" style="fill:rgb(255,95,20)">
                    <!-- pre atribut height zavolam template menom start count kde poslem parameter count -->
                    <!-- ktory predstavuje pocet startov v danom roku ktory hovori o tom do akej vysky sa obdlznik vykresli-->
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2000])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <!-- pre atribut y zavolam template menom position kde poslem parameter count s poctom startov v danom roku podla ktoreho sa urci pozicia odkial sa vykresli obldznik-->
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2000])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="180" width="40" style="fill:rgb(0,0,255)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2002])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2002])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="280" width="40" style="fill:rgb(255,95,20)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2004])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2004])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="380" width="40" style="fill:rgb(0,0,255)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2006])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2006])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="480" width="40" style="fill:rgb(255,95,20)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2008])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2008])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="580" width="40" style="fill:rgb(0,0,255)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2010])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2010])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="680" width="40" style="fill:rgb(255,95,20)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2012])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2012])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="780" width="40" style="fill:rgb(0,0,255)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2014])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2014])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="880" width="40" style="fill:rgb(255,95,20)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2016])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2016])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="980" width="40" style="fill:rgb(0,0,255)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2018])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2018])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
                <rect x="1080" width="40" style="fill:rgb(255,95,20)">
                    <xsl:attribute name="height">
                        <xsl:call-template name="start_count">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2020])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                    <xsl:attribute name="y">
                        <xsl:call-template name="position">
                            <xsl:with-param name="count">
                                <xsl:value-of select="count(//start[year=2020])"/>
                            </xsl:with-param>
                        </xsl:call-template>
                    </xsl:attribute>
                </rect>
            </g>
        </svg>
    </xsl:template>
    <!--V tomto template nastavujem danemu obdlzniku atribut height a teda do akej vysky sa ma vzkreslit dany obdlznik, podla poctu startov ktore su v parametri count-->
    <xsl:template name="start_count">
        <xsl:param name="count"/>
        <xsl:choose>
            <xsl:when test="$count = 0">
                <xsl:value-of select="0"/>
            </xsl:when>
            <xsl:when test="$count = 1">
                <xsl:value-of select="100"/>
            </xsl:when>
            <xsl:when test="$count = 2">
                <xsl:value-of select="200"/>
            </xsl:when>
            <xsl:when test="$count = 3">
                <xsl:value-of select="300"/>
            </xsl:when>
            <xsl:when test="$count = 4">
                <xsl:value-of select="400"/>
            </xsl:when>
            <xsl:when test="$count = 5">
                <xsl:value-of select="500"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <!--V tomto template nastavujem danemu obdlzniku atribut Y a teda odkial sa ma vykreslit podla toho aky je pocet startov-->
    <xsl:template name="position">
        <xsl:param name="count"/>
        <xsl:choose>
            <xsl:when test="$count = 0">
                <xsl:value-of select="500"/>
            </xsl:when>
            <xsl:when test="$count = 1">
                <xsl:value-of select="400"/>
            </xsl:when>
            <xsl:when test="$count = 2">
                <xsl:value-of select="300"/>
            </xsl:when>
            <xsl:when test="$count = 3">
                <xsl:value-of select="200"/>
            </xsl:when>
            <xsl:when test="$count = 4">
                <xsl:value-of select="100"/>
            </xsl:when>
            <xsl:when test="$count = 5">
                <xsl:value-of select="0"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
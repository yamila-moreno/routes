var hiking_cat = {
    "color": "orange",
    "icon": "android-walk"
};

var biking_cat = {
    "color": "green",
    "icon": "android-bicycle"
};

var trip_cat = {
    "color": "blue",
    "icon": "android-walk"
};

var car_cat = {
    "color": "red",
    "icon": "android-car"
};

var flight_cat = {
    "color": "blue",
    "icon": "android-plane"
};

var boat_cat = {
    "color": "blue",
    "icon": "android-boat"
};

var bus_cat = {
    "color": "red",
    "icon": "android-bus"
};

var train_cat = {
    "color": "blue",
    "icon": "android-train"
};

var motorbike_cat = {
    "color": "blue",
    "icon": "android-car"
};

var routes_dict = {
    // HIKING
    "ezcaray": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2008-03-14_Ezcaray.gpx",
        "cat": hiking_cat
    },
    "penota": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2013-09-07_La-Pennota.gpx",
        "cat": hiking_cat
    },
    "anie": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2013-09-21_Anie.gpx",
        "cat": hiking_cat
    },
    "bola-del-mundo": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-03-22_Raquetas-Bola-del-Mundo.gpx",
        "cat": hiking_cat
    },
    "presa-gasco": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-03-23_Canal-de-Guadarrama-Presa-del-Gasco.gpx",
        "cat": hiking_cat
    },
    "patones": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-04-06_Patones-Ponton-de-la-oliva.gpx",
        "cat": hiking_cat
    },
    "capileira-cebadillo": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-05-17_De-Capileira-a-Cebadillo.gpx",
        "cat": hiking_cat
    },
    "ordesa": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-06-20_Ordesa-Senda-de-los-Cazadores.gpx",
        "cat": hiking_cat
    },
    "irabia": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-06-21_Embalse-de-Irabia.gpx",
        "cat": hiking_cat
    },
    "canencia": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2014-07-06_Ruta-ecologica-Canencia.gpx",
        "cat": hiking_cat
    },
    "botanica": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2015-01-10_Senda_botanica.gpx",
        "cat": hiking_cat
    },
    "windsor": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2015-07-05_Windsor.gpx",
        "link": "http://dendarii.es/escapada-senderista-a-windsor/",
        "cat": hiking_cat
    },
    "windmills": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2015-08-01_Windmills.gpx",
        "link": "http://dendarii.es/windmills-path-desde-hassocks-hasta-lewes/",
        "cat": hiking_cat
    },
    "dover": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2015-08-08_Dover-White-Cliffs.gpx",
        "link": "http://dendarii.es/dover-y-los-acantilados-blancos/",
        "cat": hiking_cat
    },
    "capital-ring-01": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2015-08-15_CapitalRing01.gpx",
        "link": "http://dendarii.es/paseo-por-el-capital-ring-1/",
        "cat": hiking_cat
    },
    "navalhondo": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2016-03-24_Pradera-Navalhondo.gpx",
        "link": "http://dendarii.es/semana-santa-2016-la-pradera-de-navalhondo/",
        "cat": hiking_cat
    },
    "pelayos": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2016-04-17_Entre-embalses-Pelayos-de-la-presa.gpx",
        "cat": hiking_cat
    },
    "porcieda": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2016-04-30_Porcieda_Tolibes.gpx",
        "link": "http://dendarii.es/comarca-de-liebana-y-picos-de-europa-nos-vamos-de-potes/",
        "cat": hiking_cat
    },
    "fuente-de": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2016-05-01_Raquetas_Fuente_De.gpx",
        "link": "http://dendarii.es/comarca-de-liebana-y-picos-de-europa-raquetas-y-heidi/",
        "cat": hiking_cat
    },
    "arribes": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2016-05-15_Arribes.gpx",
        "link": "http://dendarii.es/las-arribes-del-duero/",
        "cat": hiking_cat
    },
    "cinera": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-03-18_Faedo_de_Cinera.gpx",
        "cat": hiking_cat
    },
    "canseco": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-03-19_Hayedo_de_Canseco.gpx",
        "cat": hiking_cat
    },
    "hoya": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-04-08_Hoya-de-San-Blas.gpx",
        "cat": hiking_cat
    },
    "vereda-cristo": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-05-21_Vereda-del-Cristo.gpx",
        "cat": hiking_cat
    },
    "vereda-valdenoches": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-08-15_Senda-de-Valdenoches.gpx",
        "cat": hiking_cat
    },
    "cuevo-tesillos": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-12-06_Cuevo_de_Tesillos.gpx",
        "cat": hiking_cat
    },
    "entre-rios": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/hiking/2017-12-07_Entre_Rios.gpx",
        "cat": hiking_cat
    },
    // HIKING
    // BIKING
    "loira": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/cycling/2012-09_Loire-a-Velo.gpx",
        "cat": biking_cat
    },
    "boadilla": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/cycling/2015-09-27_Boadilla.gpx",
        "cat": biking_cat
    },
    "fiesta-bici": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/cycling/2015-10-04_Fiesta-de-la-bici.gpx",
        "link": "http://dendarii.es/fiesta-de-la-bici-2015/",
        "cat": biking_cat
    },
    "vv-negrin": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/cycling/2016-03-25_Via-Verde-Negrin.gpx",
        "link": "http://dendarii.es/semana-santa-2016-chinchon-via-verde-negrin-y-colmenar-de-oreja/",
        "cat": biking_cat
    },
    "vv-ojos-negros": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/cycling/2016-05-17_Via_Verde_Ojos_Negros.gpx",
        "link": "http://dendarii.es/via-verde-de-ojos-negros/",
        "cat": biking_cat
    },
    // TRIPS - USA
    "muir-woods": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-05_Muir-Woods.gpx",
        "cat": trip_cat
    },
    "sequoia-big-trees": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-07_Sequoia-Bear-Hill-Big-Trees-Trail.gpx",
        "cat": trip_cat
    },
    "sequoia-congress": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-07_Sequoia-General-Sherman-Congress-Trail.gpx",
        "cat": trip_cat
    },
    "sequoia-meadow": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-07_Sequoia-Tharps-Log-Crescent-Meadow.gpx",
        "cat": trip_cat
    },
    "yosemite-lower": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-08_Yosemite-Lower-Yosemite-Fall.gpx",
        "cat": trip_cat
    },
    "mono-lake": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-09_Mono-Lake-South-Tufa.gpx",
        "cat": trip_cat
    },
    "yosemite-mist": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-09_Yosemite-Mist-Trail-John-Muir-Trail.gpx",
        "cat": trip_cat
    },
    "zion-canyon": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-12_Zion-Canyon-Overlook.gpx",
        "cat": trip_cat
    },
    "zion-pools": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-12_Zion-Emerald-Pools-Trail.gpx",
        "cat": trip_cat
    },
    "canyon-kaibab": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-13_Grand-Canyon-South-Kaibab-Trail.gpx",
        "cat": trip_cat
    },
    "canyon-helicopter": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/2014-09-14_Grand-Canyon-Helicoptero.gpx",
        "cat": trip_cat
    },
    // TRIPS - SUIZA
    "matterhorn": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/2015-08-30_Matterhorn.gpx",
        "cat": trip_cat
    },
    "aletsch": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/2015-08-31_Eggishorn-Aletsch.gpx",
        "cat": trip_cat
    },
    "lauternbrunnen": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/2015-09-02_Lauternbrunnen.gpx",
        "cat": trip_cat
    },
    "snp-9": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/2015-09-05_Ruta-9-SNP.gpx",
        "cat": trip_cat
    },
    "snp-12": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/2015-09-06_Ruta-12-SNP.gpx",
        "cat": trip_cat
    },
    "snp-17": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/2015-09-06_Ruta-17-SNP.gpx",
        "cat": trip_cat
    },
    // TRIPS - ESLOVENIA
    "bled": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-16_Lago_Bled.gpx",
        "cat": trip_cat
    },
    "vintgar": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-16_Vintgar.gpx",
        "cat": trip_cat
    },
    "bohinjski": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-17_Bohinjski_Jezero.gpx",
        "cat": trip_cat
    },
    "voje": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-17_Voje.gpx",
        "cat": trip_cat
    },
    "logarska": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-18_Logarska_Dolina.gpx",
        "cat": trip_cat
    },
    "pokljuka": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-19_Pokljuka.gpx",
        "cat": trip_cat
    },
    "velika": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-20_Velika_Planina.gpx",
        "cat": trip_cat
    },
    "slemenova": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-22_Slemenova.gpx",
        "cat": trip_cat
    },
    "sija": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-23_Sija.gpx",
        "cat": trip_cat
    },
    "parapente": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-23_Vuelo-Parapente.gpx",
        "cat": trip_cat
    },
    "kozjak": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-24_Slap_Kozjak.gpx",
        "cat": trip_cat
    },
    "tolmin": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/eslovenia2016/2016-09-24_Tolmin_Korita.gpx",
        "cat": trip_cat
    },
    // TRIPS - MARRUECOS
    "imlill": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-15_Imlil.gpx",
        "cat": trip_cat
    },
    "berber": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-16_Paseo-bereber.gpx",
        "cat": trip_cat
    },
    "cascadas": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-16_Ruta-de-las-cascadas.gpx",
        "cat": trip_cat
    },
    "todra": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-21_Todra.gpx",
        "cat": trip_cat
    },
    "skoura": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-22_Skoura.gpx",
        "cat": trip_cat
    },
    "marrakech": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-24_Marrakech.gpx",
        "cat": trip_cat
    },
    //  CAR
    "ruta-usa": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/usa2014/usa-ruta.gpx",
        "cat": car_cat
    },
    "ruta-suiza": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/suiza2015/suiza-ruta.gpx",
        "cat": car_cat
    },
    "ruta-marruecos": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/marruecos-ruta.gpx",
        "cat": car_cat
    },
    "ruta-mhamid": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-19_Mhamid_ida.gpx",
        "cat": car_cat
    },
    "ruta-chegaga": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/marruecos2017/2017-01-20_Erg_Chegaga_vuelta.gpx",
        "cat": car_cat
    },
    // TRIPS - VIETNAM
    "bus-hcmc-can-tho": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-01_Bus-HCMC-Can-Tho.gpx",
        "cat": bus_cat
    },
    "boat-can-tho": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-02_Can-Tho.gpx",
        "cat": boat_cat
    },
    "vuelo-hcmc-danang": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-03-Vuelo-HCMC-Danang.gpx",
        "cat": flight_cat
    },
    "taxi-danang-hoi-an": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-03-Taxi-Danang-Hoi-An.gpx",
        "cat": car_cat
    },
    "my-son": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-03_My-Son.gpx",
        "cat": hiking_cat
    },
    "bus-hoi-an-hue": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-05_Bus-Hoi-An-Hue.gpx",
        "cat": bus_cat
    },
    "tren-hue-dong-hoi": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-07_Tren-Hue-Dong-Hoi.gpx",
        "cat": train_cat
    },
    "bus-dong-hoi-phong-nha": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-07_Bus-Dong-Hoi-Phong-Nha.gpx",
        "cat": bus_cat
    },
    "phong-nha-cave": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-07_Phong-Nha-Cave.gpx",
        "cat": hiking_cat
    },
    "jungle-trekking": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-08_Jungle-Trekking.gpx",
        "cat": hiking_cat
    },
    "paradise-cave": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-08_Paradise-Cave.gpx",
        "cat": hiking_cat
    },
    "botanic-garden": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-09_Botanic-Garden.gpx",
        "cat": hiking_cat
    },
    "phong-nah-loop-1": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-09_Bucle-Phong-Nha-1.gpx",
        "cat": motorbike_cat
    },
    "phong-nah-loop-2": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-09_Bucle-Phong-Nha-2.gpx",
        "cat": motorbike_cat
    },
    "vuelo-dong-hoi-hanoi": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-10_Vuelo-Dong-Hoi-Hanoi.gpx",
        "cat": flight_cat
    },
    "hanoi": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-15_Ha-Noi.gpx",
        "cat": hiking_cat
    },
    "vuelo-hanoi-siem-reap": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-13_Vuelo-Hanoi-Siem-Reap.gpx",
        "cat": flight_cat
    },
    "angkor-1": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-12_Angkor.gpx",
        "cat": car_cat
    },
    "angkor-2": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-13_Angkor-II.gpx",
        "cat": car_cat
    },
    "angkor-3": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-14_Floating-Village.gpx",
        "cat": boat_cat
    },
    "bus-hanoi-mai-chau": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-16_Bus-Hanoi-Mai-Chau.gpx",
        "cat": bus_cat
    },
    "trekking-mai-chau": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-16_Trekking-Mai-Chau.gpx",
        "cat": hiking_cat
    },
    "cueva-1200-escalones": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-17_Cueva-1200-escalones.gpx",
        "cat": hiking_cat
    },
    "crucero": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-18_Crucero-Ha-Long.gpx",
        "cat": boat_cat
    },
    "ti-top": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-19_Ti-Top.gpx",
        "cat": hiking_cat
    },
    "bus-hanoi-tam-coc": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-20_Bus-Hanoi-Tam-Coc.gpx",
        "cat": bus_cat
    },
    "tam-coc": {
        "source": "https://raw.githubusercontent.com/yamila-moreno/routes/gh-pages/gpx/vietnam2017/2017-10-20_Tam-Coc.gpx",
        "cat": boat_cat
    }
};

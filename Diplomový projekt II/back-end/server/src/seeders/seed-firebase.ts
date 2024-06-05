// Dataset
const firestoreDatasets = [
  {
    id: 'jloUpYvlndz8Of1NQv1M',
    authorName: 'admin@gmail.com',
    authorUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
    csvData: `uid,visit_date,utm_source,utm_medium,utm_campaign,converted,cost_of_click
  j3xms4,2022-06-17,facebook,email,summer_sale,True,0.46
  knp3z4,2022-12-18,facebook,cpc,back_to_school,False,0.99
  238n9m,2022-09-16,twitter,cpc,back_to_school,False,1.77
  us2q12,2022-02-04,google,email,back_to_school,False,0.55
  b5qfjr,2022-09-25,google,cpc,holiday_season,False,1.03
  p772ey,2022-07-13,google,email,back_to_school,False,1.99
  txnijd,2022-06-24,twitter,email,holiday_season,False,1.3
  bod6dv,2022-07-15,facebook,email,holiday_season,False,1.19
  snkpv8,2022-05-30,twitter,email,holiday_season,False,0.6
  smxdij,2022-10-14,twitter,cpc,holiday_season,False,1.18
  s2y1bt,2022-12-27,facebook,cpm,holiday_season,False,1.83
  858y39,2022-01-10,google,email,summer_sale,False,0.48
  8isp6g,2022-04-08,facebook,cpm,summer_sale,False,2.04
  j8ml68,2022-08-19,facebook,cpm,summer_sale,False,0.64
  8q6c3y,2022-09-23,twitter,email,back_to_school,False,1.61
  buly36,2022-09-08,twitter,email,holiday_season,False,0.32
  09st8o,2022-01-06,facebook,email,holiday_season,False,1.63
  gg8xi6,2022-04-06,google,cpc,holiday_season,False,0.13
  r4z753,2022-07-21,google,cpm,back_to_school,False,1.69
  klnfny,2022-06-06,facebook,cpc,back_to_school,False,1.63
  pico84,2022-06-06,google,cpc,back_to_school,False,1.69
  mdjpc4,2022-10-23,twitter,email,summer_sale,False,0.3
  7r09xf,2022-06-14,google,email,holiday_season,False,0.83
  66fjn9,2022-05-23,twitter,email,holiday_season,False,0.85
  7ni86d,2022-03-19,facebook,cpc,summer_sale,True,0.99
  3tbidu,2022-08-11,google,cpm,summer_sale,False,0.54
  1x7yf5,2022-01-09,twitter,cpc,back_to_school,False,1.57
  2vqab2,2022-10-04,facebook,cpm,back_to_school,False,0.29
  pf8cff,2022-09-27,facebook,email,holiday_season,False,1.49
  c7emex,2022-04-29,twitter,cpm,holiday_season,False,2.01
  t9e30x,2022-09-04,twitter,cpm,back_to_school,False,2.5
  6irqw5,2022-07-17,twitter,email,back_to_school,False,1.07
  ffz9qv,2022-10-31,twitter,cpc,back_to_school,True,0.3
  sl02is,2022-05-02,facebook,email,back_to_school,False,0.68
  6tqzsr,2022-06-26,twitter,cpm,summer_sale,False,0.61
  8t4gmg,2022-07-29,facebook,cpc,holiday_season,False,1.68
  rr3nxu,2022-11-30,google,email,back_to_school,False,2.19
  wl5wbm,2022-05-23,google,cpc,back_to_school,False,0.88
  ytioiw,2022-03-27,facebook,cpm,holiday_season,False,0.19
  raghaf,2022-09-15,google,cpm,back_to_school,True,0.74
  2tbilf,2022-10-26,google,cpc,summer_sale,True,2.28
  0zxae9,2022-07-16,facebook,cpc,summer_sale,False,2.28
  s6lbn3,2022-01-21,google,email,holiday_season,False,0.03
  s6cs4q,2022-06-16,google,cpc,back_to_school,False,0.08
  vsu421,2022-06-01,google,email,summer_sale,False,0.83
  advl12,2022-09-17,google,cpm,holiday_season,False,0.32
  24cmfz,2022-09-09,google,cpc,back_to_school,False,0.69
  1xhxed,2022-08-31,google,cpc,holiday_season,False,1.48
  x958a5,2022-08-09,google,cpm,summer_sale,False,0.29
  xn5cxb,2022-10-05,google,cpc,holiday_season,False,0.48
  i68tr1,2022-01-22,twitter,cpc,summer_sale,False,2.3
  t0z5jh,2022-11-04,twitter,cpc,back_to_school,False,0.64
  kcgxte,2022-03-24,facebook,cpc,holiday_season,False,0.87
  hbs6h7,2022-08-19,google,cpm,holiday_season,False,1.11
  r7o83o,2022-10-24,facebook,email,back_to_school,True,0.72
  076e9c,2022-04-05,facebook,cpm,holiday_season,False,0.44
  7iqek7,2022-01-28,facebook,cpc,back_to_school,False,2.32
  wiwbih,2022-02-09,facebook,cpc,summer_sale,False,0.64
  d4qze9,2022-01-13,google,email,back_to_school,False,1.9
  n8941v,2022-08-02,google,cpm,back_to_school,True,2.24
  as0q93,2022-07-19,twitter,cpc,back_to_school,False,0.44
  5liwvx,2022-05-20,twitter,cpc,back_to_school,False,0.62
  ypmz88,2022-08-22,google,email,holiday_season,False,1.65
  ylvzk9,2022-05-15,facebook,email,summer_sale,False,0.51
  q4ejq6,2022-02-28,facebook,email,holiday_season,True,2.44
  nuy72a,2022-09-16,facebook,cpm,holiday_season,True,1.18
  rkkart,2022-12-28,twitter,cpm,holiday_season,False,2.24
  7xjhsr,2022-02-22,google,cpc,back_to_school,False,0.19
  ds4e68,2022-07-18,twitter,cpm,summer_sale,False,1.77
  639tj4,2022-06-18,facebook,cpm,back_to_school,False,1.34
  ujqmf9,2022-01-20,facebook,cpm,holiday_season,False,1.27
  jm8vz0,2022-10-27,google,cpc,summer_sale,False,0.68
  o1tdpf,2022-03-24,google,cpm,holiday_season,False,2.18
  4cjdgd,2022-07-06,twitter,cpc,back_to_school,False,1.95
  2vr0ox,2022-08-17,google,cpc,back_to_school,False,1.07
  rvrrge,2022-01-13,facebook,cpc,holiday_season,False,1.51
  l9yn3z,2022-03-24,twitter,cpm,back_to_school,False,0.09
  w9x976,2022-08-01,twitter,email,summer_sale,False,0.52
  1z8y7e,2022-08-02,google,cpc,summer_sale,False,0.88
  1hygds,2022-06-18,facebook,cpm,holiday_season,False,0.53
  c2uoep,2022-04-04,facebook,cpc,summer_sale,False,2.44
  3fpuj9,2022-11-13,google,cpm,holiday_season,False,1.91
  msv9zu,2022-11-24,twitter,cpm,back_to_school,False,1.94
  wlxjdd,2022-10-31,google,cpc,summer_sale,False,1.77
  gqfytd,2022-09-16,twitter,cpm,summer_sale,False,0.26
  3uvrzl,2022-08-26,google,cpm,back_to_school,False,1.6
  ohybn0,2022-12-29,google,email,summer_sale,False,0.77
  izg0df,2022-05-01,facebook,cpc,back_to_school,False,2.03
  h8mza7,2022-12-16,google,cpc,back_to_school,False,1.89
  fdktj1,2022-07-29,facebook,cpc,summer_sale,False,0.33
  snypnx,2022-12-18,google,cpc,back_to_school,True,1.04
  x9hubk,2022-04-22,google,cpm,summer_sale,False,1.13
  570po0,2022-11-17,facebook,email,holiday_season,True,1.48
  x6g2mb,2022-05-06,twitter,email,back_to_school,False,0.42
  x9cfpk,2022-03-17,google,cpc,back_to_school,False,1.49
  jcf6qy,2022-07-30,facebook,cpc,summer_sale,False,2.04
  kp1vs3,2022-07-09,google,email,holiday_season,False,1.49
  08wpsh,2022-08-22,google,cpm,holiday_season,False,0.64
  wsbsxk,2022-07-07,twitter,cpc,back_to_school,False,2.45
  93jmiy,2022-01-03,twitter,cpm,back_to_school,False,0.49
  we8ulx,2022-05-20,google,cpc,back_to_school,True,1.49
  yk9hts,2022-09-06,twitter,cpc,summer_sale,False,0.41
  g6ans4,2022-12-30,google,cpc,holiday_season,False,2.43
  gnkx0q,2022-07-23,google,cpm,holiday_season,False,0.48
  5umrc2,2022-04-28,google,cpm,summer_sale,False,0.29
  0gx52x,2022-06-09,twitter,cpc,summer_sale,False,0.26
  g0i96c,2022-11-27,twitter,email,back_to_school,False,2.26
  geqmea,2022-09-20,google,cpm,holiday_season,True,1.15
  u7rh99,2022-02-12,facebook,cpm,holiday_season,False,1.08
  x3ktsc,2022-11-10,facebook,cpc,holiday_season,False,2.45
  nweppv,2022-02-06,facebook,cpm,holiday_season,False,0.67
  khmv31,2022-12-02,google,email,back_to_school,False,2.18
  typb7j,2022-05-01,google,cpc,back_to_school,False,0.67
  zhf037,2022-05-09,twitter,email,holiday_season,False,1.64
  ogoss9,2022-07-12,facebook,cpm,holiday_season,False,1.9
  fslfb9,2022-11-12,facebook,cpm,holiday_season,False,2.28
  bkznpx,2022-07-09,google,cpc,back_to_school,False,2.26
  e9fhwk,2022-09-15,twitter,cpc,back_to_school,False,0.42
  zjipmz,2022-10-15,facebook,email,summer_sale,False,0.27
  64tw91,2022-04-28,google,cpm,summer_sale,False,0.08
  159leh,2022-01-27,twitter,cpc,back_to_school,False,0.67
  u0yld4,2022-08-21,facebook,cpm,back_to_school,True,0.65
  tf1xtc,2022-12-05,google,cpm,summer_sale,False,0.8
  myy74o,2022-07-21,google,email,holiday_season,False,1.89
  i3dv2s,2022-09-07,google,email,summer_sale,False,1.3
  k2c11y,2022-08-23,google,cpm,back_to_school,False,0.9
  vvhl5f,2022-07-25,google,cpm,summer_sale,False,0.04
  zwnpe6,2022-12-12,twitter,cpc,holiday_season,False,1.49
  38j0rs,2022-12-26,google,cpc,summer_sale,False,0.94
  0jzn8w,2022-09-29,facebook,cpc,holiday_season,False,1.96
  yuxa9g,2022-03-09,google,email,holiday_season,False,0.16
  wo3a3p,2022-01-23,google,cpm,summer_sale,False,1.29
  54mot0,2022-07-17,twitter,email,back_to_school,False,0.83
  kn578h,2022-05-22,facebook,cpm,summer_sale,False,1.3
  n2nyec,2022-06-25,twitter,cpc,summer_sale,False,0.44
  9xq7zk,2022-10-08,facebook,cpm,holiday_season,True,1.12
  0c3mqv,2022-11-01,twitter,cpc,back_to_school,True,1.91
  d737hg,2022-02-15,facebook,email,holiday_season,False,1.87
  np6yhf,2022-09-14,google,cpm,back_to_school,False,0.65
  x60d9m,2022-03-08,google,cpc,holiday_season,False,2.05
  0ifhk7,2022-03-07,google,cpc,back_to_school,False,2.4
  o4yssv,2022-06-26,facebook,email,holiday_season,False,2.01
  ntyiug,2022-10-12,google,cpc,holiday_season,False,1.08
  si2hja,2022-07-06,twitter,email,back_to_school,False,1.15
  hvu30l,2022-09-09,twitter,cpc,holiday_season,False,1.57
  2wqnpk,2022-04-08,google,email,summer_sale,False,0.42
  2cozk7,2022-11-17,twitter,cpm,back_to_school,False,0.61
  iouc0w,2022-07-13,twitter,cpm,back_to_school,False,1.23
  btw4kl,2022-06-22,facebook,cpc,summer_sale,False,0.86
  skoe5v,2022-07-17,facebook,cpm,back_to_school,False,1.25
  gd8i6t,2022-04-23,twitter,cpc,back_to_school,False,1.67
  2ecsuk,2022-05-27,twitter,cpc,back_to_school,True,1.24
  0ptkbe,2022-10-01,google,email,back_to_school,False,1.98
  qpggmr,2022-10-07,google,email,holiday_season,False,1.85
  tezp04,2022-01-25,facebook,cpm,back_to_school,False,0.64
  btem3t,2022-08-29,google,email,summer_sale,False,1.26
  xaq97j,2022-01-01,google,cpm,holiday_season,False,2.09
  immnly,2022-11-23,facebook,cpc,holiday_season,False,2.21
  p4oupr,2022-09-20,facebook,email,back_to_school,False,0.51
  juwhte,2022-08-29,twitter,email,back_to_school,False,1.03
  4knnw7,2022-04-01,facebook,cpc,back_to_school,True,2.49
  xh7a7o,2022-07-08,twitter,cpc,back_to_school,False,0.75
  6v4q98,2022-07-10,facebook,cpm,back_to_school,False,1.61
  336daf,2022-04-30,twitter,cpc,holiday_season,False,2.38
  9tgjkf,2022-12-10,twitter,email,summer_sale,False,1.76
  z1qrfu,2022-07-30,twitter,cpc,summer_sale,False,1.73
  p6tkcx,2022-06-06,google,cpc,summer_sale,False,0.29
  ucnbkc,2022-05-10,google,cpm,holiday_season,False,0.63
  1t8ubz,2022-02-10,facebook,cpc,summer_sale,False,1.47
  x9t9j7,2022-12-23,twitter,email,summer_sale,False,0.86
  xrnxpt,2022-04-28,facebook,cpc,back_to_school,False,0.81
  ucvxio,2022-12-31,twitter,cpm,holiday_season,False,2.22
  63l0lt,2022-06-25,twitter,cpm,holiday_season,False,1.62
  l0p8ur,2022-08-17,facebook,email,back_to_school,False,0.73
  udp2kk,2022-06-23,facebook,cpc,summer_sale,False,1.1
  vhvmv1,2022-01-27,twitter,cpm,holiday_season,False,1.32
  bromxe,2022-06-20,twitter,cpc,summer_sale,False,1.42
  yw51b1,2022-12-15,twitter,email,summer_sale,False,1.73
  f83lb1,2022-11-17,google,cpm,summer_sale,False,0.37
  pqw08n,2022-06-24,facebook,cpm,holiday_season,False,1.31
  rvuza3,2022-08-11,facebook,cpm,summer_sale,False,0.07
  8zsr4g,2022-06-15,google,cpc,holiday_season,False,2.4
  fv0ewz,2022-07-23,google,email,holiday_season,False,1.64
  1ble2i,2022-02-22,google,cpm,summer_sale,True,0.98
  kp7l0i,2022-10-26,google,cpc,holiday_season,True,0.13
  wa2tb6,2022-03-13,twitter,cpc,holiday_season,False,0.29
  vqtxmv,2022-10-23,twitter,email,back_to_school,False,1.82
  89xvv5,2022-03-09,google,cpc,holiday_season,False,1.51
  zdf8ej,2022-05-16,google,cpc,holiday_season,False,1.34
  ald4cd,2022-07-28,facebook,cpm,back_to_school,False,0.16
  3puk41,2022-09-25,google,cpm,summer_sale,False,0.95
  1i1qul,2022-12-23,google,email,back_to_school,False,1.64
  fdz5ju,2022-01-21,google,cpc,back_to_school,False,1.88
  eui2w8,2022-07-25,google,cpm,summer_sale,False,0.58
  qu6x3f,2022-07-12,google,cpm,back_to_school,False,1.76
  589txi,2022-10-13,facebook,cpm,back_to_school,False,0.89
  dlpdax,2022-01-30,facebook,email,summer_sale,False,0.67
  rcvqzq,2022-12-21,google,cpc,holiday_season,False,2.16
  vftd0a,2022-03-18,google,cpc,back_to_school,False,1.9
  hhysrz,2022-01-24,twitter,cpc,holiday_season,True,1.45
  mj75z8,2022-04-20,facebook,email,back_to_school,False,0.42
  5tshdk,2022-10-04,facebook,cpm,holiday_season,False,1.91
  wyciqu,2022-05-18,google,cpc,holiday_season,False,1.8
  tzbc85,2022-08-15,facebook,email,back_to_school,True,0.15
  d8xklw,2022-10-17,twitter,cpc,holiday_season,False,2.05
  16b6tm,2022-03-03,facebook,email,summer_sale,False,2.24
  2cj8q7,2022-04-29,twitter,cpm,holiday_season,False,1.6
  5bphl0,2022-01-30,twitter,cpm,summer_sale,True,2.33
  6aafjf,2022-12-08,twitter,email,back_to_school,True,2.14
  n27q3d,2022-02-07,google,cpc,back_to_school,True,0.33
  82fb6o,2022-03-27,twitter,cpc,holiday_season,False,1.51
  ihtvkf,2022-09-12,twitter,email,back_to_school,False,2.38
  opxcvb,2022-09-29,google,email,holiday_season,False,0.53
  4s3wsl,2022-06-20,facebook,cpm,back_to_school,False,2.08
  ulyrdw,2022-10-13,google,cpc,summer_sale,True,2.28
  3xxcnf,2022-05-08,google,email,back_to_school,False,0.5
  x91il5,2022-09-01,google,email,back_to_school,False,0.88
  14hu49,2022-01-29,twitter,email,back_to_school,True,2.09
  le47z7,2022-03-27,google,email,holiday_season,False,1.59
  8w4rci,2022-06-27,facebook,cpc,summer_sale,True,1.47
  4dtoq1,2022-05-21,facebook,cpm,back_to_school,False,0.56
  xd6caj,2022-02-28,google,email,back_to_school,False,2.3
  mmveuq,2022-11-20,twitter,cpm,holiday_season,False,0.98
  czvyva,2022-11-09,twitter,cpc,holiday_season,False,0.03
  m5mgtb,2022-03-15,google,cpc,summer_sale,False,1.19
  j4kdh2,2022-03-08,facebook,cpm,back_to_school,False,1.8
  ldmfl8,2022-08-16,twitter,cpm,holiday_season,False,1.99
  2c92ay,2022-06-22,google,email,holiday_season,False,0.37
  rkowlz,2022-04-12,facebook,cpc,holiday_season,False,1.87
  lnjld8,2022-07-11,google,cpc,summer_sale,False,1.46
  3xa2jv,2022-01-12,facebook,cpm,summer_sale,True,0.11
  uzj2h1,2022-03-22,google,cpc,summer_sale,False,2.29
  1mqih9,2022-01-02,twitter,cpc,holiday_season,True,0.87
  v59m7m,2022-11-17,twitter,cpm,back_to_school,False,0.86
  rsthm9,2022-10-01,google,cpm,summer_sale,False,0.78
  5z8jy5,2022-04-15,google,cpc,back_to_school,False,0.74
  ch6xi1,2022-11-20,facebook,email,back_to_school,False,0.95
  pbpzej,2022-06-30,facebook,cpm,back_to_school,False,1.27
  f4x56s,2022-04-03,facebook,cpm,holiday_season,False,0.5
  ez491z,2022-01-18,facebook,cpc,back_to_school,False,1.59
  ecjwsr,2022-10-05,google,cpm,summer_sale,False,2.06
  3fvi5y,2022-05-26,google,email,back_to_school,False,1.28
  sm3umn,2022-12-11,facebook,cpm,summer_sale,False,0.17
  54ywck,2022-04-01,twitter,cpc,holiday_season,True,1.34
  fvk5sh,2022-06-17,facebook,email,holiday_season,False,2.23
  kc9i4q,2022-06-22,google,cpc,back_to_school,False,1.37
  0g8rkb,2022-12-15,twitter,cpc,back_to_school,False,1.43
  cmadrl,2022-01-17,google,email,back_to_school,False,0.28
  48fkfr,2022-04-21,facebook,cpm,summer_sale,False,0.94
  h1gu2a,2022-11-17,twitter,cpc,back_to_school,False,0.45
  nupt2m,2022-01-27,google,cpm,holiday_season,False,1.7
  f56qzo,2022-09-20,facebook,email,back_to_school,False,0.78
  fyfk5t,2022-07-26,facebook,cpm,holiday_season,False,0.39
  a98u08,2022-09-19,twitter,cpc,back_to_school,False,0.97
  xoy4vm,2022-05-19,google,cpc,holiday_season,False,1.3
  3izeek,2022-03-14,facebook,email,summer_sale,False,2.5
  l0isab,2022-06-11,google,email,holiday_season,False,0.44
  a5uvwq,2022-02-21,facebook,cpc,back_to_school,False,0.92
  3kn358,2022-10-27,facebook,email,back_to_school,False,1.44
  00ukhq,2022-05-21,google,email,summer_sale,True,0.71
  ohvs8n,2022-09-27,facebook,cpc,summer_sale,False,2.08
  btwdtb,2022-04-29,facebook,cpm,holiday_season,False,0.98
  y0fyly,2022-08-08,google,email,summer_sale,False,1.93
  dxneew,2022-05-07,google,cpc,summer_sale,False,1.17
  i0zw2o,2022-11-27,twitter,email,summer_sale,False,0.81
  f0wdau,2022-08-15,google,cpm,back_to_school,True,2.35
  xfnbic,2022-01-28,facebook,cpm,back_to_school,False,1.89
  k2nqnp,2022-07-12,google,email,back_to_school,False,1.52
  wpig9w,2022-06-17,facebook,cpm,back_to_school,False,0.39
  7cabyt,2022-07-22,facebook,cpc,holiday_season,False,2.49
  z7b5ia,2022-01-15,google,cpc,summer_sale,False,2.44
  pyjwzh,2022-06-08,twitter,cpc,back_to_school,False,1.2
  6t256m,2022-08-03,twitter,cpm,back_to_school,True,1.71
  9387jq,2022-07-18,twitter,cpc,summer_sale,False,1.22
  h447qy,2022-09-11,twitter,cpc,summer_sale,False,0.27
  xhae8h,2022-08-12,google,cpc,holiday_season,False,0.34
  pz2ndh,2022-08-13,facebook,email,back_to_school,False,1.5
  jzsam2,2022-10-21,facebook,cpc,back_to_school,False,1.06
  ih4vsj,2022-05-13,google,cpc,holiday_season,False,1.65
  xub3ef,2022-03-18,twitter,cpm,holiday_season,False,0.34
  wov5ej,2022-11-22,facebook,cpc,holiday_season,False,1.7
  5ty2jx,2022-04-01,google,email,holiday_season,False,1.09
  zvg6a9,2022-07-09,google,cpc,back_to_school,False,0.17
  o70jc3,2022-07-16,google,email,holiday_season,False,1.81
  wo26ov,2022-06-13,twitter,cpc,back_to_school,True,1.83
  7gtu3q,2022-12-14,twitter,email,back_to_school,False,0.75
  jbcx0d,2022-06-02,twitter,cpm,holiday_season,False,2.41
  ufvlvk,2022-10-29,google,cpm,summer_sale,False,2.29
  ggixdc,2022-06-26,google,cpc,back_to_school,False,0.31
  2hyyr0,2022-08-16,google,email,holiday_season,False,0.97
  mqr64e,2022-02-24,twitter,email,back_to_school,False,1.46
  aqgoof,2022-05-04,google,email,holiday_season,False,1.91
  n6ujzz,2022-09-17,twitter,cpm,holiday_season,False,1.63
  coete8,2022-03-05,facebook,email,holiday_season,False,0.08
  j9z5xj,2022-09-19,google,cpm,holiday_season,False,0.06
  z120xr,2022-07-12,twitter,cpm,holiday_season,False,1.45
  lqonbn,2022-04-03,google,cpc,holiday_season,False,2.06
  bombn4,2022-09-30,twitter,cpm,holiday_season,False,0.28
  xpz9u6,2022-03-09,twitter,cpc,summer_sale,False,0.64
  kxzxwu,2022-09-09,twitter,cpm,holiday_season,False,0.13
  ehq9cv,2022-03-01,facebook,cpc,summer_sale,False,0.63
  gy0jij,2022-08-16,google,cpc,back_to_school,False,0.74
  je6gxs,2022-01-03,twitter,cpm,holiday_season,False,2.2
  uqatx6,2022-10-28,twitter,cpc,summer_sale,False,1.15
  o54qj7,2022-01-25,facebook,email,back_to_school,False,2.3
  c6sujt,2022-02-17,facebook,cpc,summer_sale,False,2.22
  k0iv04,2022-06-10,google,cpc,back_to_school,True,1.01
  v1rol7,2022-03-04,twitter,cpc,holiday_season,False,2.15
  jpotzp,2022-06-22,twitter,email,back_to_school,False,0.53
  nviv6o,2022-09-21,google,cpm,summer_sale,False,0.69
  ox766t,2022-05-18,google,cpc,summer_sale,False,0.63
  3e7sbx,2022-11-23,facebook,email,summer_sale,False,2.17
  e7d7sj,2022-03-14,twitter,cpm,holiday_season,False,0.41
  746xmd,2022-07-09,facebook,email,back_to_school,False,0.94
  mhf407,2022-09-25,facebook,email,summer_sale,False,1.7
  jg9z1m,2022-07-18,facebook,cpc,summer_sale,False,2.45
  msre2m,2022-05-25,facebook,cpm,summer_sale,True,1.47
  qbsqcn,2022-04-02,facebook,cpc,holiday_season,False,0.15
  chpir0,2022-04-25,facebook,cpc,holiday_season,True,0.65
  tarn4l,2022-11-10,twitter,email,holiday_season,False,1.46
  nhevv2,2022-08-24,facebook,cpc,back_to_school,True,1.24
  4zq7b7,2022-03-18,twitter,cpc,summer_sale,False,2.25
  fp53wp,2022-01-31,google,email,back_to_school,False,0.84
  wa5u68,2022-04-26,facebook,cpc,back_to_school,False,0.02
  mrxl2e,2022-02-02,facebook,email,back_to_school,False,2.27
  111gwn,2022-12-03,facebook,email,back_to_school,False,0.55
  2aya7v,2022-05-13,google,cpc,summer_sale,False,1.35
  59vfhm,2022-05-09,facebook,email,summer_sale,False,2.08
  s48663,2022-08-31,google,email,back_to_school,False,1.85
  3hz3o4,2022-04-30,google,email,back_to_school,True,1.79
  j7kq8f,2022-05-05,facebook,cpc,holiday_season,False,0.25
  jojd1i,2022-03-11,google,email,back_to_school,False,0.51
  gvu2qc,2022-03-08,google,cpc,back_to_school,False,0.53
  knfjqv,2022-05-26,facebook,cpm,back_to_school,False,1.34
  wq995l,2022-11-20,twitter,email,back_to_school,False,0.49
  161w4a,2022-06-13,google,email,back_to_school,False,0.26
  4zxpuf,2022-04-26,twitter,email,summer_sale,False,0.49
  sjm7c3,2022-03-11,twitter,cpm,back_to_school,False,0.94
  37xwbs,2022-01-19,google,cpm,back_to_school,False,0.34
  fy83wu,2022-06-12,google,email,holiday_season,False,1.05
  l9ybg8,2022-09-27,twitter,cpm,back_to_school,True,0.7
  lj5ps7,2022-11-13,facebook,cpm,summer_sale,False,1.74
  ypbhjh,2022-05-03,facebook,cpc,summer_sale,False,0.49
  ibrpoj,2022-06-17,facebook,email,summer_sale,False,1.51
  eq4gz1,2022-06-08,twitter,email,summer_sale,False,2.31
  bn3wzq,2022-01-14,facebook,cpm,back_to_school,False,0.29
  djvmz2,2022-05-08,google,email,back_to_school,False,0.74
  i95xw5,2022-10-07,facebook,cpc,summer_sale,False,0.22
  dbsdab,2022-03-06,twitter,email,back_to_school,False,1.37
  ogwz6f,2022-04-07,facebook,email,holiday_season,False,1.85
  dh5jn6,2022-03-30,twitter,cpc,back_to_school,False,0.73
  a75cmi,2022-10-18,twitter,cpc,back_to_school,False,1.37
  tv559c,2022-12-27,google,cpc,holiday_season,False,2.26
  qhku5s,2022-11-01,facebook,email,back_to_school,True,1.5
  zmfsq4,2022-06-07,twitter,cpc,holiday_season,False,1.17
  6ngdf4,2022-03-18,google,cpc,summer_sale,False,1.47
  l5suue,2022-09-29,google,cpc,summer_sale,False,0.91
  fe8cal,2022-12-29,google,cpm,summer_sale,False,0.12
  9nqk0r,2022-07-07,google,cpc,summer_sale,False,1.12
  x07vj5,2022-07-06,facebook,cpc,back_to_school,False,2.15
  auzz0q,2022-06-19,google,email,back_to_school,True,0.54
  wpym05,2022-09-22,google,cpc,holiday_season,False,0.4
  886pw1,2022-01-15,twitter,cpc,holiday_season,False,0.88
  krkfh7,2022-08-10,twitter,email,back_to_school,False,1.78
  3utmfb,2022-01-24,google,cpc,holiday_season,False,1.84
  wl0cvj,2022-01-31,google,cpc,back_to_school,False,0.51
  vc4i48,2022-11-18,facebook,cpm,back_to_school,False,0.08
  d0urs5,2022-03-14,google,cpm,summer_sale,False,0.67
  dnh4pu,2022-12-02,google,email,back_to_school,False,1.93
  25jcda,2022-08-23,google,cpc,holiday_season,False,2.2
  26iv2t,2022-04-22,facebook,email,holiday_season,False,0.62
  s4jwd8,2022-06-01,facebook,cpm,summer_sale,False,0.38
  twtbfr,2022-05-25,google,cpm,summer_sale,False,0.81
  j0noam,2022-03-10,facebook,cpc,summer_sale,False,1.43
  tyd0g9,2022-05-26,twitter,email,back_to_school,False,1.33
  6jnmyt,2022-08-17,google,email,back_to_school,True,2.39
  2v2np0,2022-05-13,google,cpm,back_to_school,False,0.84
  6c5h3h,2022-09-11,twitter,cpc,summer_sale,False,2.12
  jeyqox,2022-03-22,facebook,email,back_to_school,False,0.99
  ptifcz,2022-12-09,twitter,email,holiday_season,False,0.11
  ekfdqd,2022-01-21,facebook,cpm,back_to_school,False,1.36
  l5rq3k,2022-09-05,twitter,email,back_to_school,False,1.3
  78p8mb,2022-04-12,google,email,summer_sale,False,0.81
  zy1rty,2022-10-01,twitter,email,back_to_school,False,0.44
  94tk8x,2022-07-03,google,cpc,summer_sale,False,0.22
  a7yuf4,2022-08-16,google,cpc,back_to_school,False,1.53
  i316en,2022-03-07,facebook,cpc,back_to_school,False,1.49
  p0ly3h,2022-12-15,facebook,email,holiday_season,True,0.36
  zpkve7,2022-01-26,twitter,email,holiday_season,False,0.61
  plixs8,2022-04-27,twitter,cpm,holiday_season,False,1.97
  zx3omm,2022-09-24,google,cpc,summer_sale,False,0.36
  jg7ih9,2022-02-24,facebook,email,back_to_school,False,1.05
  ksixhv,2022-12-28,facebook,cpc,holiday_season,False,0.35
  c7c7x9,2022-04-17,google,email,summer_sale,False,1.08
  m4dy1b,2022-10-11,twitter,cpm,summer_sale,False,1.01
  up2whh,2022-08-01,google,cpc,holiday_season,False,0.36
  yj8hbz,2022-07-04,twitter,cpm,holiday_season,False,0.41
  yb4jbc,2022-11-09,google,cpc,back_to_school,False,2.45
  ykpah3,2022-03-29,facebook,cpc,summer_sale,False,2.11
  xuyym7,2022-06-22,google,cpm,holiday_season,False,0.87
  ekrvlg,2022-05-12,twitter,cpm,back_to_school,True,1.14
  kov0fu,2022-02-25,facebook,cpm,summer_sale,False,0.06
  c8x25z,2022-10-19,google,email,back_to_school,False,1.59
  x7567u,2022-10-27,google,cpm,summer_sale,False,1.27
  p4lylr,2022-02-10,google,cpm,back_to_school,False,1.0
  ncbnyj,2022-01-23,twitter,cpc,holiday_season,True,0.58
  2cfwpd,2022-10-20,twitter,cpm,back_to_school,False,0.86
  8v8dq3,2022-06-20,google,email,back_to_school,False,1.18
  dg58we,2022-12-26,twitter,cpc,holiday_season,False,0.93
  50xjfk,2022-02-15,facebook,cpc,holiday_season,False,0.94
  6pd1e2,2022-01-28,google,email,holiday_season,False,1.99
  4sod2z,2022-03-30,twitter,email,holiday_season,False,1.94
  fcu9ix,2022-03-08,google,email,back_to_school,True,0.26
  6wexj4,2022-03-13,facebook,cpm,summer_sale,False,0.96
  68udq6,2022-08-04,twitter,cpm,holiday_season,False,0.19
  87o7lg,2022-02-01,twitter,cpm,holiday_season,False,1.24
  zbt7pm,2022-10-18,twitter,cpc,back_to_school,False,0.57
  fy4bib,2022-09-06,facebook,email,back_to_school,False,2.26
  3ye18a,2022-07-19,facebook,email,back_to_school,False,0.14
  emgd6m,2022-06-14,facebook,cpm,summer_sale,False,2.25
  hg817x,2022-02-21,facebook,email,back_to_school,False,1.62
  xmnmug,2022-08-01,google,email,back_to_school,False,0.24
  6iyat3,2022-05-08,twitter,email,back_to_school,True,2.46
  2ovbny,2022-06-16,twitter,cpm,back_to_school,True,1.43
  dg8w7y,2022-03-04,twitter,email,summer_sale,False,1.64
  5ji1z1,2022-12-26,twitter,cpc,holiday_season,False,2.28
  mpl3c8,2022-08-28,twitter,cpm,summer_sale,False,1.76
  1gme4e,2022-09-30,facebook,cpc,holiday_season,True,1.15
  dhpf61,2022-11-09,twitter,email,summer_sale,False,0.64
  e1ibnx,2022-09-10,google,cpc,back_to_school,False,2.36
  2p8rzf,2022-10-03,facebook,email,summer_sale,False,0.94
  eaozg7,2022-03-21,facebook,email,holiday_season,False,1.76
  ptqvxe,2022-06-23,google,email,holiday_season,False,1.37
  mw687w,2022-03-16,twitter,cpc,summer_sale,False,0.45
  h25ser,2022-08-11,twitter,email,summer_sale,False,2.14
  qgvvxz,2022-05-31,twitter,cpm,holiday_season,False,0.71
  ngrqnd,2022-07-07,twitter,cpm,summer_sale,False,0.69
  k86ioy,2022-07-05,facebook,cpc,back_to_school,False,0.71
  nrtmgl,2022-02-12,twitter,cpm,summer_sale,False,0.28
  zogef4,2022-03-17,facebook,cpc,holiday_season,False,0.17
  6hcill,2022-01-12,google,cpm,back_to_school,False,1.22
  2x93oh,2022-08-04,twitter,email,holiday_season,False,0.4
  v3vlxd,2022-08-07,facebook,email,holiday_season,True,1.59
  8r8jsc,2022-04-03,twitter,cpm,back_to_school,False,2.5
  dv8bbl,2022-10-15,google,cpc,holiday_season,False,0.94
  mc9brz,2022-02-19,google,cpc,summer_sale,True,1.54
  aixhaj,2022-08-27,facebook,cpc,holiday_season,False,2.22
  x82720,2022-04-09,google,email,summer_sale,False,2.21
  jakxvt,2022-11-23,twitter,cpm,summer_sale,False,2.45
  q3lh21,2022-03-03,facebook,email,back_to_school,False,0.35
  61kos2,2022-01-21,facebook,cpc,summer_sale,False,1.55
  ec0146,2022-10-27,facebook,cpm,summer_sale,False,0.52
  t1eb80,2022-12-03,twitter,cpc,back_to_school,False,0.11
  jctlg3,2022-08-16,google,cpc,back_to_school,False,2.36
  bwmb7w,2022-12-05,facebook,cpm,summer_sale,False,0.19
  t9kccp,2022-11-05,twitter,cpc,summer_sale,False,0.11
  m83mus,2022-03-08,google,cpm,summer_sale,False,1.63
  nhpvze,2022-09-01,google,cpm,back_to_school,False,1.26
  ul54qm,2022-01-22,twitter,cpm,summer_sale,False,0.89
  scgnpd,2022-05-27,twitter,cpm,summer_sale,False,0.35
  ufs5jn,2022-09-22,facebook,email,holiday_season,False,0.4
  9ssa1p,2022-06-28,facebook,email,holiday_season,False,2.27
  ny69dw,2022-07-21,facebook,email,summer_sale,False,2.43
  fy308r,2022-06-10,facebook,cpm,holiday_season,False,1.15
  wtrbs6,2022-11-04,google,cpc,summer_sale,False,1.1
  qhlsbf,2022-06-22,google,cpc,holiday_season,False,0.48
  u45c6v,2022-09-05,facebook,cpc,back_to_school,False,2.15
  ixaoj8,2022-07-31,facebook,cpc,holiday_season,False,0.63
  fjtnjj,2022-05-19,twitter,cpc,summer_sale,True,0.24
  eeg7a5,2022-08-01,twitter,cpm,holiday_season,True,0.75
  f8zl77,2022-02-07,twitter,cpc,holiday_season,True,0.47
  8fff1d,2022-11-09,facebook,cpc,holiday_season,False,2.09
  3x7xfr,2022-11-25,facebook,cpm,back_to_school,False,0.69
  b36722,2022-12-10,google,email,holiday_season,False,0.3
  6kz8t3,2022-07-28,google,cpc,back_to_school,False,2.06
  3afbpt,2022-11-02,google,cpc,summer_sale,False,0.78
  7cjjxd,2022-01-20,twitter,email,back_to_school,True,0.07
  pzr1g4,2022-06-16,google,cpc,holiday_season,False,1.91
  3bd012,2022-10-29,google,cpm,back_to_school,False,0.82
  8c5xxt,2022-12-18,twitter,cpc,back_to_school,False,0.08
  3j04i5,2022-07-19,facebook,cpc,summer_sale,False,0.04
  b3exhn,2022-01-23,google,email,summer_sale,False,1.66
  tauecx,2022-07-23,twitter,cpm,summer_sale,False,0.33
  ra7roe,2022-11-16,twitter,email,back_to_school,False,0.05
  yvdjwz,2022-03-17,twitter,cpc,holiday_season,False,2.2
  v7dwg9,2022-12-24,facebook,cpm,back_to_school,False,1.88
  opg6dq,2022-04-13,facebook,cpm,summer_sale,False,1.61
  es69fm,2022-07-28,twitter,cpm,holiday_season,False,0.09
  5zvm08,2022-03-08,google,email,holiday_season,False,0.13
  7whixg,2022-11-11,twitter,email,holiday_season,False,1.51
  9bm899,2022-06-09,facebook,cpm,summer_sale,False,0.62
  n8900x,2022-07-04,twitter,email,summer_sale,False,2.35
  z029ap,2022-08-17,twitter,cpc,holiday_season,False,1.47
  eoyyeq,2022-07-28,facebook,cpm,summer_sale,False,0.83
  w2mbtv,2022-12-26,facebook,cpm,summer_sale,False,2.0
  6h9tr2,2022-06-02,google,email,back_to_school,False,1.96
  s6am6t,2022-10-27,google,cpm,holiday_season,False,1.89
  5ibtoj,2022-08-08,google,cpc,back_to_school,False,1.11
  ej20mv,2022-04-25,facebook,cpm,back_to_school,False,2.34
  hgxhk3,2022-04-24,twitter,email,summer_sale,False,2.07
  mjhozc,2022-06-08,facebook,cpc,holiday_season,False,0.91
  44wfjo,2022-01-18,google,cpm,back_to_school,False,0.6
  h9paqo,2022-01-14,twitter,cpm,back_to_school,False,0.26
  aim1qe,2022-07-24,twitter,cpc,holiday_season,False,2.39
  qsu2rz,2022-06-11,twitter,cpc,holiday_season,False,1.9
  w79c30,2022-04-13,google,cpc,holiday_season,False,1.39
  ixuwgv,2022-11-14,google,email,holiday_season,False,2.26
  cfnoop,2022-07-08,google,cpm,back_to_school,False,0.04
  a441g1,2022-02-23,facebook,cpc,summer_sale,False,1.51
  dcv87l,2022-03-25,google,cpc,back_to_school,False,0.35
  4l1dfh,2022-07-03,google,cpm,back_to_school,False,1.23
  90iyms,2022-05-11,twitter,email,summer_sale,False,0.64
  rfp9vr,2022-04-14,twitter,email,back_to_school,False,0.52
  1fb133,2022-04-23,twitter,email,back_to_school,False,0.58
  6cn7we,2022-06-30,google,cpm,summer_sale,False,1.06
  mnpqq8,2022-09-23,google,cpm,holiday_season,False,1.95
  5p8wz5,2022-01-26,facebook,cpc,holiday_season,False,1.62
  q2yuoq,2022-07-31,twitter,cpc,back_to_school,False,1.79
  scfnkw,2022-09-21,google,email,back_to_school,False,1.52
  45pehj,2022-09-28,google,email,back_to_school,False,1.34
  zq3h1i,2022-08-22,twitter,cpm,holiday_season,False,1.49
  k8e5rf,2022-04-05,facebook,cpc,holiday_season,False,1.03
  nf8ziu,2022-06-18,google,cpm,holiday_season,False,1.5
  83xxop,2022-12-19,google,cpm,back_to_school,False,1.78
  dshe3h,2022-07-05,google,cpm,holiday_season,False,0.21
  pidm4f,2022-05-11,google,cpm,back_to_school,False,0.1
  eo23f2,2022-03-10,twitter,cpm,back_to_school,False,1.78
  92q3b4,2022-10-24,google,email,back_to_school,False,1.84
  3zvlge,2022-05-28,google,cpc,holiday_season,True,1.39
  mpudnl,2022-09-18,twitter,email,summer_sale,False,2.24
  rfcv9k,2022-08-30,facebook,cpc,back_to_school,False,0.74
  pkd3r6,2022-05-17,twitter,cpc,holiday_season,True,0.9
  4c55qi,2022-11-28,twitter,cpm,summer_sale,False,0.49
  qqpxrn,2022-06-16,google,cpm,holiday_season,False,2.38
  h6jr08,2022-02-24,google,cpm,holiday_season,False,0.5
  jwzpko,2022-07-15,google,cpc,summer_sale,False,2.29
  l5ampm,2022-11-03,google,email,summer_sale,False,1.92
  j6y03s,2022-08-18,twitter,email,back_to_school,False,1.98
  oieqdn,2022-11-01,facebook,email,back_to_school,False,0.15
  sdsqup,2022-01-21,facebook,cpm,summer_sale,False,2.07
  rz0t58,2022-09-18,google,cpm,holiday_season,True,0.78
  7m0cnu,2022-08-30,twitter,cpc,summer_sale,False,1.68
  u85r3k,2022-05-23,google,email,holiday_season,False,1.31
  os6vac,2022-02-03,google,cpm,back_to_school,False,0.93
  mcqy4g,2022-02-05,google,email,summer_sale,True,1.84
  gxlvg7,2022-09-18,google,cpm,summer_sale,False,1.19
  avpaqd,2022-08-29,google,cpc,back_to_school,False,0.95
  ii97ra,2022-05-09,facebook,cpc,summer_sale,False,2.15
  v0kyrx,2022-12-07,google,email,summer_sale,False,0.96
  oiaqir,2022-03-23,google,cpm,back_to_school,False,1.02
  m56ih7,2022-06-28,facebook,cpc,summer_sale,True,1.8
  u7xbr9,2022-02-13,google,cpm,back_to_school,False,1.64
  hzzbdf,2022-02-13,google,cpc,back_to_school,False,2.37
  yv82s9,2022-09-01,twitter,cpm,holiday_season,False,2.13
  afroht,2022-01-29,facebook,cpc,back_to_school,False,1.4
  yj0fr0,2022-04-29,twitter,cpm,holiday_season,False,1.5
  0e815g,2022-03-16,google,email,holiday_season,False,2.46
  dwar8y,2022-08-23,twitter,cpc,back_to_school,False,1.15
  4w91a4,2022-10-30,google,cpc,back_to_school,False,2.18
  cow586,2022-05-09,google,cpm,back_to_school,False,1.65
  2oosix,2022-11-28,google,email,back_to_school,False,0.69
  nbqjo6,2022-08-08,facebook,cpc,back_to_school,False,2.35
  h4k5z7,2022-02-23,facebook,cpc,summer_sale,False,0.02
  35naay,2022-09-19,google,email,back_to_school,False,0.74
  6tgfl0,2022-02-17,twitter,cpc,summer_sale,False,1.72
  0quri0,2022-12-24,facebook,cpm,back_to_school,False,1.09
  xq065n,2022-05-29,google,cpc,back_to_school,False,1.91
  mad3w6,2022-08-20,facebook,cpm,summer_sale,False,0.08
  cjfyaj,2022-03-15,facebook,cpc,summer_sale,False,2.09
  qrwotv,2022-09-09,google,cpc,holiday_season,False,1.37
  b5zzq8,2022-09-18,facebook,cpm,summer_sale,False,2.14
  e3ishn,2022-12-14,google,email,holiday_season,False,0.53
  x8d1y9,2022-12-02,twitter,email,back_to_school,False,0.52
  jevw2n,2022-04-01,google,cpc,summer_sale,False,1.64
  38dofi,2022-11-22,google,cpm,summer_sale,False,0.62
  yehrgt,2022-03-01,facebook,cpm,back_to_school,False,0.24
  uuyt03,2022-05-28,facebook,email,holiday_season,False,0.2
  cudui7,2022-02-16,google,email,holiday_season,False,2.24
  t2fapm,2022-01-13,twitter,email,holiday_season,False,0.2
  n1rmyp,2022-05-22,twitter,cpc,back_to_school,False,1.85
  xc83gy,2022-10-28,twitter,cpc,summer_sale,False,0.4
  qlq4ay,2022-03-12,facebook,email,holiday_season,False,2.5
  qqvmjg,2022-08-28,google,email,summer_sale,False,1.59
  pi8zwk,2022-06-03,twitter,cpc,holiday_season,False,1.39
  14gn56,2022-03-27,twitter,cpc,back_to_school,False,0.81
  5vpdwi,2022-03-07,twitter,cpc,back_to_school,True,2.1
  rlxyyv,2022-03-28,twitter,email,back_to_school,False,2.2
  i1x1jb,2022-10-05,twitter,cpm,back_to_school,False,1.07
  5ugb90,2022-04-03,twitter,cpc,holiday_season,False,2.27
  9v8yda,2022-06-06,twitter,cpc,summer_sale,False,1.54
  o87hjo,2022-08-28,twitter,cpm,back_to_school,False,0.96
  gwq67p,2022-07-11,twitter,email,back_to_school,False,0.08
  lfltia,2022-02-07,twitter,cpc,back_to_school,False,0.37
  m2to3q,2022-06-18,facebook,cpc,holiday_season,False,1.39
  dnixcb,2022-09-22,google,cpm,summer_sale,False,1.05
  84y3o1,2022-09-08,twitter,cpc,back_to_school,False,1.44
  d33byx,2022-03-24,twitter,cpc,summer_sale,False,0.7
  yn0h8e,2022-04-02,facebook,email,holiday_season,False,0.72
  43eg3n,2022-12-16,twitter,email,back_to_school,True,1.91
  voydbg,2022-12-27,google,cpm,summer_sale,False,1.85
  8zxeky,2022-01-09,google,cpm,summer_sale,False,0.5
  m57yv9,2022-05-16,google,cpm,back_to_school,False,1.34
  zgtikv,2022-10-28,google,email,summer_sale,False,1.52
  ztpq83,2022-09-03,facebook,cpm,back_to_school,False,1.7
  oipqu4,2022-04-24,facebook,cpm,back_to_school,False,0.84
  h1zigb,2022-10-13,google,email,back_to_school,False,1.71
  i4vbw0,2022-04-30,google,cpm,back_to_school,False,0.66
  n3hh4x,2022-07-24,facebook,cpc,back_to_school,False,1.92
  82ijf2,2022-12-05,google,email,back_to_school,True,0.07
  uqjgcw,2022-04-27,google,cpc,summer_sale,False,0.71
  smg14c,2022-08-06,google,email,holiday_season,False,1.06
  cflb22,2022-07-30,facebook,email,holiday_season,False,1.26
  45t9zb,2022-04-09,google,cpc,holiday_season,False,0.89
  rsqm5a,2022-02-05,google,cpm,summer_sale,False,2.21
  4ldwh0,2022-10-23,google,cpm,back_to_school,False,1.57
  l1lz3w,2022-12-17,google,cpc,summer_sale,False,2.47
  vd2jmj,2022-09-19,twitter,cpc,back_to_school,False,1.97
  79hmny,2022-07-18,twitter,cpc,back_to_school,False,1.92
  48r95w,2022-03-11,facebook,email,back_to_school,False,2.04
  qabm71,2022-03-02,twitter,cpm,holiday_season,False,1.17
  454btp,2022-12-28,twitter,cpm,summer_sale,False,1.86
  x5wlpq,2022-01-11,twitter,email,holiday_season,False,2.07
  ncenph,2022-07-16,google,cpc,holiday_season,False,0.79
  cnah8h,2022-06-07,google,cpc,summer_sale,False,1.18
  k8ndve,2022-01-08,twitter,cpc,back_to_school,False,0.36
  la5jku,2022-09-08,facebook,cpc,summer_sale,False,0.54
  s6ducq,2022-03-23,google,cpc,summer_sale,False,1.1
  2fwzg6,2022-06-09,twitter,cpc,holiday_season,False,2.38
  mplncu,2022-05-28,google,cpc,back_to_school,False,1.29
  1tth1h,2022-08-26,google,email,summer_sale,False,0.7
  l5vfdx,2022-06-19,google,email,back_to_school,False,1.68
  6phcxp,2022-09-19,twitter,cpc,summer_sale,True,2.34
  y442c0,2022-03-20,facebook,email,holiday_season,False,1.34
  nejkoj,2022-02-21,facebook,cpm,holiday_season,False,1.71
  39b1ya,2022-09-01,google,cpm,holiday_season,False,1.27
  zibup1,2022-03-07,google,cpm,holiday_season,False,1.28
  n1aldu,2022-05-27,google,cpm,holiday_season,True,1.78
  z1cibx,2022-01-27,twitter,cpm,holiday_season,True,1.56
  41a8tk,2022-05-06,google,cpc,back_to_school,False,0.78
  10s1zc,2022-11-01,google,email,back_to_school,False,0.99
  q2qjj9,2022-04-02,google,cpm,back_to_school,False,1.93
  dl4jvd,2022-12-06,google,email,holiday_season,False,1.78
  9b7hj2,2022-01-24,twitter,cpc,holiday_season,False,1.11
  4oxaet,2022-02-13,twitter,cpc,back_to_school,False,0.36
  hep2px,2022-06-13,google,email,summer_sale,False,1.7
  oe3q6e,2022-10-26,facebook,cpc,summer_sale,False,0.4
  v0hoy4,2022-04-23,facebook,cpm,holiday_season,True,0.76
  rxvwhz,2022-01-18,google,cpc,back_to_school,True,1.21
  hf8nxh,2022-02-13,google,cpm,holiday_season,False,0.63
  18j5l8,2022-02-19,google,cpm,back_to_school,False,2.0
  e54tl7,2022-02-19,facebook,cpm,summer_sale,False,2.5
  xlrc3x,2022-12-29,google,cpc,holiday_season,False,1.08
  7xp55c,2022-02-25,twitter,cpm,back_to_school,False,0.75
  0duyy9,2022-11-22,google,cpc,holiday_season,False,0.76
  kcmerf,2022-11-23,google,email,holiday_season,False,0.95
  9x3ro5,2022-06-12,google,cpc,holiday_season,True,2.36
  eydy4q,2022-06-29,twitter,cpc,back_to_school,False,0.13
  pnzhnr,2022-05-23,twitter,cpm,holiday_season,False,2.25
  c5bn6o,2022-04-15,facebook,email,summer_sale,False,0.21
  gmy6o1,2022-01-09,google,email,summer_sale,False,1.76
  xlcpzc,2022-05-20,google,cpm,back_to_school,False,0.45
  dj5mmt,2022-05-06,facebook,cpc,back_to_school,False,0.7
  qelz57,2022-03-18,twitter,email,back_to_school,False,0.81
  ye4jy1,2022-01-18,twitter,email,back_to_school,False,1.88
  o7rda7,2022-05-28,facebook,email,holiday_season,False,0.36
  t7ivcf,2022-02-20,google,cpc,summer_sale,False,0.14
  4oxtb5,2022-04-27,google,cpc,summer_sale,False,0.36
  k9veza,2022-04-05,facebook,cpc,holiday_season,False,2.07
  y4lr5b,2022-06-17,google,email,back_to_school,False,1.2
  4xfeem,2022-04-13,twitter,cpc,holiday_season,False,0.57
  i3d8fo,2022-07-28,twitter,cpc,back_to_school,False,1.88
  dw8iol,2022-07-03,twitter,email,summer_sale,False,1.5
  2jkjo8,2022-12-11,google,cpc,holiday_season,False,2.03
  poikjz,2022-04-05,google,cpc,holiday_season,False,2.31
  f3g7h0,2022-07-04,facebook,cpm,holiday_season,False,1.97
  x104l8,2022-02-03,facebook,cpm,holiday_season,False,2.1
  5x8qoh,2022-08-11,twitter,cpc,holiday_season,False,1.62
  qje028,2022-10-29,twitter,email,back_to_school,False,1.97
  v6oxhl,2022-07-05,twitter,cpc,back_to_school,False,0.08
  69ef6u,2022-02-10,facebook,cpc,holiday_season,False,0.9
  ao85hv,2022-11-23,google,email,summer_sale,False,0.02
  x0lo2f,2022-10-20,facebook,email,summer_sale,True,0.81
  m85dqs,2022-09-08,google,cpc,summer_sale,False,2.08
  2tocfj,2022-12-30,twitter,email,summer_sale,False,1.6
  1l15mu,2022-04-24,google,email,holiday_season,False,1.44
  oscipj,2022-08-15,google,cpm,summer_sale,False,0.08
  hl0exi,2022-12-12,google,email,back_to_school,False,0.11
  kssqia,2022-10-06,twitter,cpc,holiday_season,False,1.76
  623o0i,2022-05-08,google,cpc,back_to_school,False,2.19
  4thynv,2022-02-24,facebook,email,holiday_season,False,2.5
  0g0bql,2022-02-13,google,cpc,back_to_school,True,0.42
  d5x7kq,2022-03-01,google,email,holiday_season,False,2.49
  v8mpz2,2022-08-12,google,cpc,back_to_school,False,1.59
  edyx1b,2022-04-16,twitter,cpc,back_to_school,False,0.08
  zoqrwa,2022-08-10,google,cpc,holiday_season,False,0.57
  wuxr8f,2022-01-05,facebook,cpc,summer_sale,False,2.26
  kkjg3n,2022-04-27,google,cpc,summer_sale,False,2.05
  xtejx5,2022-04-21,google,cpc,summer_sale,False,0.8
  n1lfhd,2022-01-12,google,cpm,holiday_season,True,1.5
  fbgpgt,2022-04-05,google,cpc,holiday_season,False,0.31
  qxkzvm,2022-10-05,google,email,back_to_school,False,1.3
  5blo7w,2022-01-10,google,email,back_to_school,True,0.81
  9aoxr9,2022-12-30,twitter,cpm,holiday_season,False,1.29
  bhpx57,2022-07-09,google,email,holiday_season,False,1.53
  8spqrx,2022-06-05,facebook,cpm,summer_sale,False,0.91
  t9i8cd,2022-10-03,twitter,cpm,back_to_school,False,0.87
  gcwwzt,2022-04-09,google,cpm,summer_sale,True,0.52
  96j0ov,2022-02-06,facebook,cpm,holiday_season,False,0.78
  59qwxv,2022-08-13,twitter,cpc,back_to_school,False,2.24
  g41hvk,2022-12-13,google,cpc,holiday_season,False,1.27
  a7w655,2022-11-17,facebook,cpc,back_to_school,True,1.16
  rtx71y,2022-06-01,google,email,summer_sale,False,1.02
  k8us7i,2022-07-18,twitter,email,back_to_school,True,2.35
  75livs,2022-01-20,facebook,cpc,summer_sale,False,1.14
  7p2bo2,2022-09-12,twitter,cpc,holiday_season,False,2.37
  uvjw0h,2022-04-18,google,cpc,holiday_season,False,2.2
  c90n8f,2022-10-14,twitter,cpc,summer_sale,True,1.64
  y0q7wt,2022-02-02,google,cpc,holiday_season,False,0.28
  e3buy6,2022-11-14,twitter,email,summer_sale,False,1.24
  ngibi5,2022-06-04,google,email,back_to_school,False,1.35
  8pg37z,2022-11-11,google,email,holiday_season,True,1.08
  nb5xav,2022-06-29,twitter,cpm,summer_sale,False,2.27
  9zmd6d,2022-03-26,facebook,email,summer_sale,False,0.08
  n8u0l1,2022-03-03,facebook,cpm,holiday_season,False,0.72
  6qsv42,2022-11-12,facebook,email,holiday_season,False,2.49
  4l991u,2022-08-10,google,cpc,back_to_school,False,0.65
  7k2s3k,2022-04-13,google,cpc,summer_sale,False,0.43
  4ns9lm,2022-07-15,google,cpm,summer_sale,False,1.71
  ku3bfg,2022-01-05,google,cpm,back_to_school,True,0.56
  9m1wih,2022-11-28,google,cpc,back_to_school,True,1.68
  bdj9s7,2022-10-14,facebook,email,back_to_school,False,0.21
  ywiaz1,2022-09-06,twitter,email,back_to_school,False,1.23
  kqk4sy,2022-09-12,facebook,cpc,back_to_school,True,2.29
  t38ehf,2022-05-11,twitter,email,back_to_school,False,1.47
  rfycjv,2022-10-04,twitter,email,holiday_season,False,1.17
  18e8sd,2022-11-16,google,cpc,summer_sale,True,1.69
  a2d2ap,2022-10-15,facebook,cpc,holiday_season,False,1.32
  f73f3i,2022-08-19,facebook,cpm,back_to_school,True,1.42
  hx29qh,2022-10-21,facebook,cpm,holiday_season,True,0.29
  w3psiu,2022-05-13,google,email,back_to_school,False,2.33
  2012ak,2022-06-01,google,cpm,summer_sale,False,2.02
  1yzx03,2022-03-18,twitter,email,holiday_season,False,2.15
  pm9lhi,2022-09-16,twitter,cpc,summer_sale,True,0.67
  tzbpee,2022-03-31,google,email,holiday_season,False,0.16
  w6qy6t,2022-02-21,google,cpc,back_to_school,False,2.39
  ulp5ce,2022-05-23,facebook,cpc,holiday_season,False,0.99
  ngdy1q,2022-04-10,facebook,email,back_to_school,False,2.16
  ww2886,2022-08-09,twitter,cpc,holiday_season,False,0.31
  lzafvo,2022-03-31,facebook,cpc,back_to_school,False,1.73
  yr7vhh,2022-01-16,twitter,cpc,holiday_season,False,1.2
  scn9vr,2022-05-07,facebook,cpc,back_to_school,False,0.92
  rqddjs,2022-04-24,facebook,cpm,back_to_school,False,0.84
  thglql,2022-08-31,facebook,cpm,back_to_school,False,2.1
  n8uar7,2022-12-05,twitter,email,summer_sale,False,2.25
  cu0cw5,2022-07-24,facebook,email,back_to_school,False,2.25
  f1q6s0,2022-12-18,facebook,cpc,back_to_school,False,2.17
  q0d5jg,2022-09-19,twitter,cpm,holiday_season,False,0.25
  mkekxe,2022-06-30,google,email,holiday_season,False,1.42
  v0tz77,2022-05-25,google,cpc,summer_sale,False,0.46
  ehyktr,2022-09-02,google,cpc,holiday_season,True,1.31
  dy71wl,2022-08-28,twitter,cpc,summer_sale,False,1.87
  tvuip3,2022-11-07,google,email,summer_sale,False,1.24
  lxmy0p,2022-09-07,facebook,cpm,summer_sale,False,0.63
  3z9lb1,2022-04-03,twitter,cpm,summer_sale,True,0.65
  qsz0nq,2022-12-07,twitter,cpc,summer_sale,False,1.46
  0r2adf,2022-07-09,facebook,cpc,back_to_school,False,0.56
  h9katk,2022-02-23,facebook,cpc,summer_sale,False,0.01
  kd71b6,2022-12-22,google,cpm,back_to_school,False,2.27
  aa9sk6,2022-04-05,google,email,holiday_season,False,0.45
  hrj3gz,2022-07-31,google,email,back_to_school,False,0.16
  efr188,2022-12-12,facebook,cpc,holiday_season,True,0.93
  brakaz,2022-07-03,twitter,cpc,holiday_season,False,2.07
  rvdmf4,2022-05-10,google,cpc,summer_sale,False,2.12
  pezg0v,2022-10-16,google,cpc,back_to_school,False,1.83
  fq0vld,2022-04-02,facebook,email,summer_sale,False,1.79
  bgfhdk,2022-03-04,facebook,cpc,back_to_school,False,1.52
  g9cn4w,2022-05-18,facebook,email,holiday_season,False,0.61
  1en5x0,2022-05-01,google,cpm,back_to_school,False,0.14
  a9pqtn,2022-04-19,twitter,email,summer_sale,False,0.53
  c030ch,2022-06-15,twitter,cpm,back_to_school,False,1.54
  r247re,2022-01-16,google,cpc,back_to_school,False,1.53
  ys38ai,2022-01-06,twitter,cpm,summer_sale,False,0.79
  cuzgcd,2022-04-06,facebook,cpm,back_to_school,False,0.46
  a2z8d8,2022-08-15,google,cpc,holiday_season,False,0.74
  v1g4n9,2022-11-11,twitter,cpc,back_to_school,False,1.41
  woth2n,2022-09-16,facebook,cpc,holiday_season,False,2.37
  v6fz7j,2022-01-07,google,cpc,back_to_school,False,1.24
  dryj8f,2022-02-16,twitter,email,summer_sale,False,1.82
  ik503b,2022-04-26,google,cpm,holiday_season,True,0.4
  mhp38u,2022-04-06,google,cpc,holiday_season,False,1.54
  qvy97c,2022-01-08,twitter,cpc,summer_sale,False,1.64
  gh1qwe,2022-08-26,twitter,cpc,holiday_season,False,1.86
  jx9050,2022-10-11,twitter,cpc,back_to_school,False,0.81
  pipmv7,2022-10-14,google,cpc,summer_sale,False,2.5
  bwbimi,2022-09-10,google,cpm,summer_sale,False,2.18
  qq4qc3,2022-08-18,twitter,cpc,back_to_school,False,2.17
  171yet,2022-04-24,twitter,email,holiday_season,False,0.47
  jfpwgb,2022-11-23,google,cpc,back_to_school,False,0.65
  urfwad,2022-04-01,google,email,holiday_season,True,0.43
  z0qi64,2022-05-28,google,cpc,holiday_season,False,1.84
  73frdv,2022-02-13,twitter,cpc,back_to_school,False,1.14
  gsrbpw,2022-01-20,twitter,cpc,back_to_school,False,0.65
  a5x3r4,2022-04-10,google,cpc,holiday_season,False,1.97
  3wvcsf,2022-11-01,twitter,cpc,summer_sale,False,0.81
  kbm9io,2022-11-14,google,cpm,summer_sale,False,1.04
  gs9lcn,2022-05-30,google,email,back_to_school,False,1.67
  a5s7yu,2022-09-25,twitter,cpc,holiday_season,False,2.39
  e2rlm5,2022-10-26,facebook,cpc,holiday_season,True,0.1
  h7zg6x,2022-09-23,twitter,cpm,back_to_school,False,0.38
  09gmqu,2022-03-20,twitter,cpc,back_to_school,False,1.55
  q5jxqs,2022-02-13,facebook,cpc,holiday_season,False,1.43
  ghugr5,2022-04-22,twitter,cpm,summer_sale,False,2.06
  wciw4d,2022-11-11,google,email,holiday_season,False,1.63
  iovnki,2022-04-06,google,cpc,summer_sale,False,1.72
  vfg2h9,2022-08-04,facebook,cpm,holiday_season,False,0.75
  ssi90f,2022-01-01,facebook,cpm,summer_sale,False,1.24
  4r85um,2022-06-14,twitter,email,summer_sale,True,0.6
  x1vi93,2022-06-17,google,email,holiday_season,False,0.28
  qbpdr9,2022-12-28,twitter,cpc,holiday_season,True,1.62
  0yaj0h,2022-01-22,google,email,summer_sale,False,1.95
  yw651s,2022-08-12,twitter,email,back_to_school,True,2.07
  dohza0,2022-11-05,facebook,email,summer_sale,False,1.86
  tf0kvp,2022-11-11,facebook,cpc,summer_sale,False,0.99
  hlxecl,2022-10-22,google,cpc,back_to_school,False,1.14
  tg6qmi,2022-01-22,twitter,cpm,summer_sale,False,0.37
  cgeuzw,2022-04-30,facebook,email,back_to_school,True,1.8
  wguysb,2022-06-28,google,cpm,summer_sale,False,1.36
  m9euhl,2022-10-30,facebook,email,holiday_season,False,1.44
  ce0bol,2022-01-05,facebook,cpm,back_to_school,False,1.16
  4qikjx,2022-01-31,twitter,cpc,back_to_school,False,1.76
  x1xcx1,2022-01-16,google,cpc,holiday_season,False,2.19
  e9aoqg,2022-09-20,twitter,cpc,summer_sale,False,0.9
  m73as6,2022-06-09,twitter,cpm,summer_sale,False,0.51
  tzn68y,2022-07-04,twitter,email,holiday_season,False,2.14
  5nexi4,2022-02-23,twitter,cpc,holiday_season,False,0.18
  7utjwo,2022-02-19,twitter,cpc,summer_sale,False,0.98
  g4wp0j,2022-06-02,google,cpm,back_to_school,False,0.57
  a7vhy2,2022-07-14,google,cpc,back_to_school,False,1.89
  fofdlr,2022-11-04,twitter,cpm,holiday_season,True,0.02
  uykezx,2022-04-14,facebook,cpm,summer_sale,False,2.4
  g6k6vr,2022-07-01,facebook,cpm,summer_sale,False,0.81
  yj3r7d,2022-03-05,facebook,cpm,summer_sale,False,0.35
  3wrjjf,2022-09-14,google,cpc,summer_sale,False,1.06
  iftizd,2022-12-19,google,email,back_to_school,False,2.32
  l83urx,2022-07-20,facebook,cpm,summer_sale,False,0.87
  xkvxoa,2022-10-16,facebook,cpc,holiday_season,False,0.23
  pjmo6t,2022-02-17,google,cpc,back_to_school,False,0.83
  070luu,2022-11-02,facebook,cpc,back_to_school,False,1.91
  knzt2q,2022-02-22,google,cpm,back_to_school,True,2.35
  q3uy48,2022-10-17,twitter,cpc,back_to_school,False,2.2
  ql1zum,2022-07-07,google,cpc,back_to_school,False,2.48
  e7qyzu,2022-01-15,twitter,cpm,holiday_season,False,0.48
  ck4hxp,2022-09-04,twitter,cpm,summer_sale,False,1.17
  6xbrm1,2022-08-11,google,cpm,back_to_school,False,0.1
  jjyxlm,2022-05-06,facebook,email,back_to_school,False,0.53
  tfanw7,2022-05-11,google,cpm,summer_sale,False,0.85
  ran6dg,2022-07-07,google,cpc,back_to_school,False,0.4
  j27lz9,2022-04-23,google,email,back_to_school,True,0.1
  a219mb,2022-05-01,facebook,cpc,summer_sale,False,0.73
  tr11es,2022-08-07,google,cpm,holiday_season,False,0.17
  u057nb,2022-10-16,facebook,cpc,back_to_school,False,1.66
  22iuuz,2022-01-25,twitter,cpc,summer_sale,False,0.82
  u6yss9,2022-12-17,google,cpm,summer_sale,False,2.0
  r1vqpj,2022-02-16,google,cpm,back_to_school,True,1.42
  gaig3x,2022-08-25,facebook,email,back_to_school,False,0.06
  a2whrr,2022-10-08,twitter,cpc,summer_sale,False,0.49
  cljboc,2022-08-07,facebook,email,holiday_season,False,1.68
  bb8lpo,2022-06-09,google,email,summer_sale,False,0.62
  184cko,2022-12-31,facebook,cpc,summer_sale,False,0.29
  n0z9y1,2022-06-23,facebook,cpc,summer_sale,False,2.14
  ftz8ni,2022-10-24,google,cpc,summer_sale,False,0.61
  nlbt51,2022-07-21,facebook,email,holiday_season,False,1.25
  0u4x44,2022-11-15,google,cpm,summer_sale,False,1.34
  b2e9b8,2022-06-04,twitter,cpm,holiday_season,False,2.15
  54sk23,2022-03-01,google,cpc,holiday_season,False,0.87
  nig7dk,2022-09-17,google,cpc,holiday_season,False,1.31
  cb2ruu,2022-01-25,facebook,email,back_to_school,True,0.24
  pxwhck,2022-01-17,facebook,cpc,summer_sale,True,0.71
  ai7h4b,2022-02-21,facebook,email,holiday_season,False,0.39
  z7a347,2022-02-09,twitter,email,back_to_school,False,1.23
  l9y20u,2022-12-17,facebook,cpc,summer_sale,False,0.53
  017e7j,2022-08-19,twitter,cpc,holiday_season,False,1.6
  g139ya,2022-04-15,google,cpm,back_to_school,True,0.42
  3u7206,2022-11-10,google,email,summer_sale,False,1.58
  nge54y,2022-01-09,google,email,holiday_season,False,0.73
  iyh1z4,2022-04-10,google,cpc,holiday_season,False,0.91
  16bbl0,2022-12-22,facebook,cpm,back_to_school,False,2.1
  tev1ic,2022-12-24,facebook,cpm,summer_sale,False,0.73
  d5k9k7,2022-11-22,twitter,cpc,summer_sale,False,0.52
  20ca14,2022-12-13,twitter,cpm,holiday_season,False,0.08
  zrbcqe,2022-04-02,facebook,email,summer_sale,True,0.5
  6z7dne,2022-03-15,facebook,cpc,back_to_school,False,0.12
  3eazuu,2022-10-01,twitter,cpm,summer_sale,False,0.58
  m60lwv,2022-07-11,google,email,summer_sale,False,1.7
  i94tqc,2022-10-10,facebook,cpc,summer_sale,False,2.13
  omad1f,2022-11-26,twitter,cpm,summer_sale,False,1.93
  3apx0d,2022-05-25,twitter,cpm,holiday_season,False,1.36
  8is0ho,2022-11-24,twitter,cpm,back_to_school,False,2.17
  illjdh,2022-10-31,facebook,cpc,holiday_season,False,2.35
  3s9mn9,2022-02-17,twitter,email,holiday_season,False,0.51
  9zrw40,2022-12-01,twitter,cpm,summer_sale,False,1.63
  m15g06,2022-03-01,twitter,email,summer_sale,False,1.94
  0rny5x,2022-06-11,facebook,cpc,summer_sale,False,1.85
  l8yge3,2022-01-29,facebook,cpm,summer_sale,False,0.26
  4nhj9m,2022-04-05,facebook,email,back_to_school,False,2.13
  t8jvbj,2022-03-03,facebook,email,back_to_school,False,0.32
  rdprgk,2022-07-01,facebook,cpc,summer_sale,False,0.67
  6jaf21,2022-06-02,google,cpc,holiday_season,False,0.09
  7eon8v,2022-09-29,twitter,cpc,summer_sale,False,1.05
  eoell2,2022-08-25,twitter,email,back_to_school,False,2.29
  3xogjv,2022-01-12,twitter,cpc,back_to_school,False,0.12
  1uztak,2022-08-24,google,cpm,back_to_school,True,0.62
  ecu16c,2022-10-30,facebook,email,back_to_school,False,0.64
  l7ydvd,2022-07-10,twitter,email,back_to_school,True,2.39
  ujkzxu,2022-12-22,twitter,cpc,holiday_season,False,1.78
  9ecj9i,2022-06-23,google,cpm,holiday_season,False,1.38
  i3bbsg,2022-01-03,facebook,cpc,holiday_season,False,0.33
  z4yywe,2022-05-06,twitter,email,holiday_season,False,0.48
  m4mwfl,2022-01-26,facebook,cpm,holiday_season,False,0.1
  7428i0,2022-05-25,twitter,cpc,summer_sale,False,0.57
  tvrvim,2022-02-17,facebook,cpc,back_to_school,False,0.04
  ux2eo7,2022-10-11,facebook,cpc,back_to_school,False,0.42
  u1r2k7,2022-07-05,twitter,email,holiday_season,False,0.23
  3w2z0l,2022-06-03,twitter,cpm,back_to_school,False,0.88
  k2hfg4,2022-05-10,google,email,holiday_season,False,2.19
  6ylonj,2022-09-28,google,cpc,holiday_season,False,0.84
  4crnpc,2022-12-21,facebook,email,back_to_school,True,1.93
  t1hrj2,2022-10-31,facebook,cpm,holiday_season,False,0.92
  9hqhn9,2022-04-10,google,cpc,holiday_season,False,0.5
  ra8lan,2022-06-02,facebook,email,back_to_school,False,2.4
  vlimh6,2022-01-09,twitter,cpc,holiday_season,True,0.25
  q8214d,2022-10-02,google,cpc,back_to_school,False,1.25
  9zv5sz,2022-05-16,twitter,cpm,back_to_school,False,2.09
  c5qjr4,2022-09-22,twitter,cpc,summer_sale,False,1.54
  np357t,2022-05-27,facebook,cpc,summer_sale,False,1.1
  ivn2ws,2022-09-13,facebook,cpc,summer_sale,False,0.91
  d2h2el,2022-02-06,twitter,cpc,holiday_season,False,1.45
  d1cch0,2022-12-27,facebook,cpm,holiday_season,False,0.52
  8kakca,2022-09-17,twitter,cpc,back_to_school,False,0.01
  px2x3j,2022-09-19,twitter,cpc,back_to_school,True,0.63
  q2dqit,2022-09-29,facebook,cpc,summer_sale,False,0.85
  nxz6kd,2022-10-11,twitter,cpc,back_to_school,False,0.84
  c3z3lm,2022-01-07,google,cpc,back_to_school,False,1.29
  2kdjvq,2022-04-02,facebook,email,back_to_school,False,0.44
  0xf51q,2022-03-20,twitter,cpc,back_to_school,False,0.92
  t8cgb7,2022-05-11,twitter,cpm,summer_sale,False,2.26
  eq6aqk,2022-01-09,google,email,back_to_school,False,1.39
  am6u0j,2022-09-11,twitter,cpm,holiday_season,False,1.92
  b7do87,2022-01-16,twitter,cpm,summer_sale,False,2.08
  n7z3hu,2022-07-22,twitter,email,summer_sale,False,2.11
  ac0jmu,2022-04-10,facebook,cpm,holiday_season,False,1.45
  29q5r6,2022-12-24,google,email,back_to_school,True,0.54
  3jrjjj,2022-12-22,twitter,email,holiday_season,False,1.3
  705v8h,2022-10-11,twitter,cpc,back_to_school,False,0.4
  vahwud,2022-11-13,facebook,email,back_to_school,False,2.01
  6hmv6g,2022-06-28,google,cpm,back_to_school,False,0.37
  pnjkjk,2022-12-13,twitter,cpm,summer_sale,False,0.46
  uckjnd,2022-10-11,twitter,email,back_to_school,False,0.51
  jc790b,2022-01-06,google,cpm,holiday_season,False,0.65
  n6fnwr,2022-09-01,facebook,email,back_to_school,False,0.17
  dn9ju9,2022-04-21,facebook,email,summer_sale,False,1.9
  i6ywck,2022-05-07,twitter,cpm,summer_sale,False,0.65
  4n71d1,2022-07-07,google,cpc,back_to_school,False,1.39
  v200ot,2022-12-12,google,cpc,back_to_school,False,1.18
  0ity7j,2022-05-19,twitter,cpm,back_to_school,False,0.46
  j0czav,2022-09-01,google,cpm,summer_sale,False,1.97
  hml7t3,2022-05-27,twitter,cpc,back_to_school,False,2.36
  wlqjqh,2022-12-09,facebook,cpc,summer_sale,False,0.4
  qwgctv,2022-10-12,google,cpc,back_to_school,False,0.03
  17zm7i,2022-08-29,google,cpm,summer_sale,False,0.54
  7qzt2i,2022-10-11,google,cpc,back_to_school,False,0.99
  92bbgb,2022-01-05,twitter,cpm,back_to_school,False,1.84
  vuzq08,2022-02-11,facebook,cpm,holiday_season,False,1.29
  owmk8h,2022-07-21,google,email,summer_sale,False,1.15
  zfy0c5,2022-07-20,twitter,cpc,summer_sale,True,1.78
  szsxp8,2022-02-24,google,cpm,back_to_school,False,2.01
  hisaqt,2022-09-19,google,email,back_to_school,False,2.44
  yq5xo7,2022-06-14,twitter,cpc,holiday_season,False,1.76
  0od0yn,2022-05-12,google,cpc,back_to_school,False,1.57
  gqo98u,2022-07-15,twitter,cpc,holiday_season,False,0.61
  680687,2022-10-29,facebook,cpm,summer_sale,False,0.52
  gdhnjs,2022-04-18,twitter,email,holiday_season,True,1.38
  hht392,2022-11-02,twitter,cpc,back_to_school,False,0.81
  zf2067,2022-05-03,twitter,cpc,summer_sale,True,0.59
  vkxn7m,2022-12-30,google,cpm,holiday_season,False,1.26
  hs54r6,2022-07-19,google,cpm,back_to_school,False,1.56
  p7neln,2022-08-02,facebook,cpm,back_to_school,False,1.13
  nf7e9g,2022-12-08,google,cpc,summer_sale,False,0.29
  atfeqy,2022-04-12,facebook,cpc,back_to_school,False,0.69
  h5y358,2022-11-05,google,cpc,summer_sale,False,1.91
  czlu3c,2022-05-19,google,cpm,summer_sale,False,1.99
  pdsebi,2022-03-24,google,cpc,summer_sale,True,2.29
  i01nwt,2022-10-18,google,cpm,holiday_season,True,2.47
  utocl2,2022-10-06,facebook,cpc,summer_sale,False,1.66
  ifz9fy,2022-04-08,google,cpm,holiday_season,True,2.34
  cmn2nr,2022-07-29,google,email,holiday_season,False,1.25
  sxxvfn,2022-12-13,twitter,cpc,back_to_school,False,0.9
  bfv67g,2022-01-31,twitter,cpc,summer_sale,False,0.34
  hpjcz2,2022-03-05,facebook,cpm,back_to_school,False,0.32
  r1k0ou,2022-10-30,google,cpc,back_to_school,False,0.99`,
    datasetName: 'mkt_synthetic',
    publishDate: '11/17/2023, 2:03:21 PM',
    size: 'small',
  },
  {
    id: 'm7LxNH7cOHwHZG0yei7I',
    authorName: 'admin@gmail.com',
    authorUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
    csvData: `ad_id,xyz_campaign_id,fb_campaign_id,age,gender,interest,Impressions,Clicks,Spent,Total_Conversion,Approved_Conversion
    708746,916,103916,30-34,M,15,7350,1,1.429999948,2,1
    708749,916,103917,30-34,M,16,17861,2,1.820000023,2,0
    708771,916,103920,30-34,M,20,693,0,0,1,0
    708815,916,103928,30-34,M,28,4259,1,1.25,1,0
    708818,916,103928,30-34,M,28,4133,1,1.289999962,1,1
    708820,916,103929,30-34,M,29,1915,0,0,1,1
    708889,916,103940,30-34,M,15,15615,3,4.769999981,1,0
    708895,916,103941,30-34,M,16,10951,1,1.269999981,1,1
    708953,916,103951,30-34,M,27,2355,1,1.5,1,0
    708958,916,103952,30-34,M,28,9502,3,3.159999967,1,0
    708979,916,103955,30-34,M,31,1224,0,0,1,0
    709023,916,103962,30-34,M,7,735,0,0,1,0
    709038,916,103965,30-34,M,16,5117,0,0,1,0
    709040,916,103965,30-34,M,16,5120,0,0,1,0
    709059,916,103968,30-34,M,20,14669,7,10.28000021,1,1
    709105,916,103976,30-34,M,28,1241,0,0,1,1
    709115,916,103978,30-34,M,30,2305,1,0.569999993,1,0
    709124,916,103979,30-34,M,31,1024,0,0,1,1
    709179,916,103988,35-39,M,15,4627,1,1.690000057,1,0
    709183,916,103989,35-39,M,16,21026,4,4.630000114,2,1
    709320,916,104012,35-39,M,15,1422,0,0,1,1
    709323,916,104012,35-39,M,15,7132,2,2.609999895,1,0
    709326,916,104013,35-39,M,16,12190,2,3.049999952,1,0
    709327,916,104013,35-39,M,16,12193,2,3.059999943,1,1
    709328,916,104013,35-39,M,16,3332,0,0,1,1
    709455,916,104034,35-39,M,7,559,0,0,1,0
    709544,916,104049,35-39,M,29,7440,2,2.980000019,1,1
    709614,916,104061,40-44,M,16,19113,4,5.5200001,1,0
    709756,916,104085,40-44,M,16,10976,2,1.690000057,1,1
    709761,916,104085,40-44,M,16,2861,0,0,1,0
    709899,916,104108,40-44,M,15,1398,0,0,1,1
    709901,916,104109,40-44,M,16,23817,7,8.470000148,1,1
    710045,916,104133,45-49,M,16,47224,12,15.82000017,1,0
    710088,916,104140,45-49,M,24,2283,1,1.470000029,1,0
    710360,916,104185,45-49,M,21,2182,1,1.529999971,1,1
    710477,916,104205,30-34,F,16,2654,0,0,1,1
    710480,916,104205,30-34,F,16,57665,14,18.06999969,1,1
    710571,916,104220,30-34,F,32,3091,1,1.610000014,1,1
    710617,916,104228,30-34,F,15,5014,1,1.190000057,1,0
    710623,916,104229,30-34,F,16,38726,7,9.220000267,1,0
    710628,916,104230,30-34,F,18,1473,0,0,1,0
    710682,916,104239,30-34,F,27,1186,0,0,1,0
    710763,916,104252,30-34,F,15,5369,1,1.50999999,1,0
    710836,916,104265,30-34,F,29,22221,7,9.430000067,1,1
    710867,916,104270,30-34,F,63,1185,0,0,1,0
    710880,916,104272,30-34,F,65,13019,5,6.960000038,1,0
    710961,916,104285,35-39,F,25,2508,1,1.220000029,1,0
    710968,916,104287,35-39,F,27,5864,2,2.799999952,1,1
    711217,916,104328,35-39,F,20,2783,1,1.600000024,1,0
    711623,916,104396,40-44,F,15,3812,1,1.129999995,2,1
    711764,916,104419,45-49,F,10,11199,4,5.730000019,1,1
    711785,916,104423,45-49,F,19,292,0,0,1,0
    711877,916,104438,45-49,F,63,17572,7,9.379999995,1,0
    712052,916,104467,45-49,F,10,1448,0,0,1,1
    734209,936,108654,30-34,M,10,1772,0,0,1,1
    734210,936,108654,30-34,M,10,13329,4,5.629999995,1,1
    734215,936,108655,30-34,M,15,13659,3,3.840000033,1,0
    734243,936,108660,30-34,M,21,739,0,0,1,1
    734266,936,108664,30-34,M,25,605,0,0,1,0
    734272,936,108665,30-34,M,26,1030,0,0,1,0
    734290,936,108668,30-34,M,29,5374,1,1.039999962,4,0
    734313,936,108672,30-34,M,36,790,0,0,1,1
    734314,936,108672,30-34,M,36,962,0,0,1,0
    734352,936,108678,35-39,M,10,4423,1,1.460000038,1,1
    734361,936,108680,35-39,M,16,12382,2,2.839999914,1,1
    734381,936,108683,35-39,M,20,2938,1,1.350000024,1,1
    734399,936,108686,35-39,M,23,239,0,0,1,0
    734418,936,108689,35-39,M,26,591,0,0,1,0
    734421,936,108690,35-39,M,27,10332,4,5.75,1,0
    734427,936,108691,35-39,M,28,8259,3,3.980000019,1,0
    734433,936,108692,35-39,M,29,12158,3,4.449999928,1,0
    734582,936,108716,40-44,M,29,7709,2,1.320000052,2,0
    734605,936,108720,40-44,M,36,834,0,0,1,0
    734660,936,108729,45-49,M,18,1299,0,0,2,0
    734666,936,108730,45-49,M,19,371,0,0,1,0
    734726,936,108740,45-49,M,29,10466,3,4.090000033,1,0
    734737,936,108742,45-49,M,31,839,0,0,1,0
    734785,936,108750,30-34,F,10,5576,1,1.529999971,1,1
    734794,936,108752,30-34,F,16,4010,0,0,1,0
    734796,936,108752,30-34,F,16,39337,7,10.03000009,1,1
    734800,936,108753,30-34,F,18,1635,0,0,1,0
    734803,936,108753,30-34,F,18,1631,0,0,1,0
    734852,936,108761,30-34,F,26,13479,3,4.25,1,0
    734854,936,108762,30-34,F,27,57022,13,20.29000032,3,3
    734856,936,108762,30-34,F,27,5453,1,1.389999986,1,1
    734866,936,108764,30-34,F,29,11803,3,4.440000057,1,0
    734881,936,108766,30-34,F,31,4259,1,1.570000052,1,1
    734901,936,108770,30-34,F,64,1554,0,0,1,0
    734903,936,108770,30-34,F,64,5323,1,1.289999962,1,1
    734925,936,108774,35-39,F,10,5024,1,1.409999967,1,1
    734939,936,108776,35-39,F,16,104648,24,33.33000004,4,2
    734968,936,108781,35-39,F,22,8504,3,3.340000093,1,1
    734999,936,108786,35-39,F,27,20277,6,8.050000072,1,0
    735014,936,108788,35-39,F,29,12403,4,5.210000038,1,1
    735032,936,108791,35-39,F,32,498,0,0,1,1
    735033,936,108792,35-39,F,36,652,0,0,0,0
    735043,936,108793,35-39,F,63,1357,0,0,1,1
    735048,936,108794,35-39,F,64,1393,0,0,1,0
    735065,936,108797,40-44,F,7,648,0,0,1,0
    735109,936,108804,40-44,F,21,708,0,0,1,1
    735140,936,108809,40-44,F,26,6907,2,2.349999964,1,0
    735143,936,108810,40-44,F,27,39035,13,19.32999957,1,0
    735151,936,108811,40-44,F,28,926,0,0,1,0
    735184,936,108817,40-44,F,63,4412,1,1.450000048,1,0
    735189,936,108818,40-44,F,64,9965,3,4.050000072,1,0
    735213,936,108822,45-49,F,10,73634,23,32.97999978,1,0
    735220,936,108823,45-49,F,15,69708,20,31.28999949,1,0
    735242,936,108826,45-49,F,19,530,0,0,1,0
    735247,936,108827,45-49,F,20,14257,6,8.789999962,1,0
    735289,936,108834,45-49,F,27,20362,5,9.119999886,1,1
    735290,936,108834,45-49,F,27,12215,4,6.26000011,1,0
    735298,936,108836,45-49,F,29,85412,28,38.63999999,2,1
    736869,936,109448,30-34,M,2,2338,1,0.239999995,1,0
    736890,936,109451,30-34,M,15,2522,0,0,1,0
    736893,936,109452,30-34,M,16,3587,0,0,1,0
    736977,936,109470,30-34,M,27,1273,0,0,1,0
    736988,936,109472,30-34,M,28,3891,1,1.090000033,1,0
    736995,936,109473,30-34,M,29,1888,0,0,1,0
    736997,936,109473,30-34,M,29,1895,0,0,1,0
    737097,936,109498,35-39,M,7,715,0,0,1,0
    737130,936,109507,35-39,M,16,11199,2,2.680000067,1,0
    737320,936,109553,35-39,M,63,5676,2,3.00999999,1,0
    737375,936,109565,40-44,M,10,1415,0,0,1,0
    737524,936,109601,40-44,M,30,2148,1,1.580000043,1,1
    737644,936,109629,45-49,M,16,45401,10,14.06000042,1,0
    737657,936,109633,45-49,M,18,7478,2,2.900000095,1,1
    737658,936,109633,45-49,M,18,4919,1,1.590000033,1,0
    737674,936,109637,45-49,M,20,533,0,0,1,1
    737766,936,109659,45-49,M,29,1447,0,0,1,1
    737896,936,109689,30-34,F,16,17553,3,4.590000153,1,0
    737931,936,109698,30-34,F,20,3343,1,0.540000021,1,0
    737961,936,109706,30-34,F,23,523,0,0,1,0
    737995,936,109714,30-34,F,26,1873,0,0,1,0
    738006,936,109717,30-34,F,27,34740,7,13.41000009,1,1
    738067,936,109731,30-34,F,32,658,0,0,1,0
    738098,936,109738,30-34,F,64,1539,0,0,1,0
    738307,936,109788,35-39,F,31,3010,1,0.860000014,1,1
    738389,936,109808,40-44,F,10,27081,9,10.77000046,1,1
    738408,936,109813,40-44,F,16,20233,4,5.590000153,3,0
    738413,936,109813,40-44,F,16,147159,36,58.16000044,3,1
    738423,936,109816,40-44,F,18,21664,7,10.61999977,1,1
    738436,936,109820,40-44,F,19,9112,4,5.460000038,1,1
    738463,936,109826,40-44,F,21,542,0,0,1,0
    738528,936,109839,40-44,F,30,402,0,0,1,1
    738560,936,109844,40-44,F,64,1338,0,0,1,0
    738582,936,109848,45-49,F,10,46150,15,20.17999983,1,1
    738592,936,109850,45-49,F,16,493821,116,176.3799977,4,1
    738593,936,109850,45-49,F,16,92011,27,34.39000046,2,1
    738598,936,109851,45-49,F,18,12956,4,5.49000001,1,1
    738606,936,109852,45-49,F,19,529,0,0,1,0
    738637,936,109857,45-49,F,24,944,1,1.419999957,1,0
    738648,936,109859,45-49,F,26,111090,38,51.97000027,5,1
    747212,936,110836,30-34,M,10,7208,2,3.190000057,1,0
    747213,936,110836,30-34,M,10,1746,0,0,1,0
    747220,936,110837,30-34,M,15,2474,0,0,2,2
    747222,936,110838,30-34,M,16,12489,2,1.960000038,1,0
    747223,936,110838,30-34,M,16,8032,1,0.600000024,2,0
    747248,936,110842,30-34,M,21,472,0,0,1,1
    747332,936,110856,30-34,M,64,792,0,0,1,1
    747362,936,110861,35-39,M,15,4607,1,1.149999976,1,1
    747369,936,110862,35-39,M,16,13355,2,3.180000067,1,1
    747370,936,110862,35-39,M,16,2936,0,0,1,0
    747401,936,110867,35-39,M,22,2793,1,0.980000019,1,1
    747435,936,110873,35-39,M,28,1032,0,0,1,0
    747439,936,110874,35-39,M,29,1662,0,0,1,1
    747489,936,110882,40-44,M,2,4016,2,1.480000049,1,1
    747514,936,110886,40-44,M,16,14843,3,2.939999938,1,1
    747645,936,110908,45-49,M,10,9674,3,4.600000024,1,1
    747659,936,110910,45-49,M,16,12186,2,2.669999957,1,0
    747675,936,110913,45-49,M,20,673,0,0,1,0
    747678,936,110914,45-49,M,21,370,0,0,1,1
    747712,936,110919,45-49,M,26,450,0,0,1,1
    747790,936,110932,30-34,F,10,2077,0,0,1,1
    747791,936,110932,30-34,F,10,31393,8,10.96000051,1,1
    747795,936,110933,30-34,F,15,8410,2,2.359999895,1,1
    747798,936,110934,30-34,F,16,25884,5,7.350000143,1,0
    747824,936,110938,30-34,F,21,608,0,0,1,1
    747828,936,110939,30-34,F,22,28488,10,9.340000033,1,0
    747852,936,110943,30-34,F,26,10126,3,4.619999886,1,0
    747859,936,110944,30-34,F,27,22572,5,8.5,1,0
    747863,936,110944,30-34,F,27,1955,0,0,1,1
    747879,936,110947,30-34,F,30,493,0,0,1,0
    747903,936,110951,30-34,F,63,1491,0,0,1,1
    747911,936,110952,30-34,F,64,1495,0,0,1,1
    747968,936,110962,35-39,F,21,512,0,0,0,0
    747991,936,110966,35-39,F,25,4868,2,2.420000076,1,0
    748000,936,110967,35-39,F,26,6585,2,2.950000048,1,0
    748007,936,110968,35-39,F,27,10164,2,3.720000029,1,1
    748014,936,110970,35-39,F,29,11182,4,4.449999809,1,0
    748045,936,110975,35-39,F,63,1238,0,0,1,0
    748086,936,110982,40-44,F,16,34127,8,13.07000017,1,0
    748087,936,110982,40-44,F,16,29466,7,10.84999967,2,0
    748089,936,110982,40-44,F,16,38759,9,10.84999967,1,0
    748091,936,110982,40-44,F,16,41720,10,12.06000006,1,1
    748225,936,111005,45-49,F,15,18602,5,8.860000134,1,0
    748230,936,111006,45-49,F,16,83929,21,27.72999954,4,1
    748231,936,111006,45-49,F,16,25194,6,7.349999905,1,0
    748233,936,111006,45-49,F,16,78627,19,26.53000045,1,0
    748235,936,111006,45-49,F,16,102695,25,39.42999983,3,0
    748294,936,111016,45-49,F,27,82827,24,47.93000031,3,0
    748295,936,111016,45-49,F,27,9240,3,6.039999962,1,0
    748303,936,111018,45-49,F,29,7706,2,2.369999886,1,0
    748314,936,111020,45-49,F,31,7821,4,6.340000153,1,1
    748341,936,111024,45-49,F,64,1363,0,0,1,1
    776318,936,115484,45-49,F,15,3569,0,0,1,1
    776322,936,115485,45-49,F,16,119063,34,53.21999949,1,0
    776323,936,115485,45-49,F,16,99078,23,35.79999948,2,0
    776325,936,115485,45-49,F,16,452398,114,180.2200012,1,0
    776334,936,115487,45-49,F,10,191223,48,76.41000056,1,0
    776336,936,115487,45-49,F,10,22216,6,9.549999952,1,0
    776338,936,115487,45-49,F,10,48291,11,18.01999998,1,0
    776353,936,115490,40-44,F,63,27559,8,13.37,1,0
    776373,936,115493,45-49,F,25,10194,4,4.590000033,2,1
    776383,936,115495,45-49,F,23,1168,0,0,1,1
    776405,936,115498,45-49,F,21,40126,16,25.86000001,1,0
    776416,936,115500,45-49,F,19,3659,1,0.49000001,1,1
    776430,936,115503,30-34,M,10,3200,0,0,1,0
    776464,936,115508,45-49,F,29,7550,1,1.679999948,1,1
    776469,936,115509,45-49,F,28,45397,15,25.41999936,1,1
    776473,936,115510,30-34,M,16,23086,2,3.310000062,1,1
    776475,936,115510,30-34,M,16,16425,1,1.549999952,1,0
    776476,936,115510,30-34,M,16,43756,5,5.439999938,0,0
    776477,936,115510,30-34,M,16,9982,0,0,1,0
    776489,936,115512,45-49,F,26,175389,55,81.60999787,1,0
    776494,936,115513,30-34,M,15,7015,0,0,1,0
    776515,936,115517,45-49,F,65,12706,3,4.98999989,1,1
    776519,936,115517,45-49,F,65,70702,20,31.7099998,1,0
    776533,936,115520,45-49,F,63,63927,16,25.52000046,2,0
    776534,936,115520,45-49,F,63,15105,3,4.25999999,1,0
    776538,936,115521,30-34,F,15,8774,1,1.830000043,1,0
    776551,936,115523,30-34,F,16,14459,1,1.389999986,1,0
    776552,936,115523,30-34,F,16,21596,2,2.809999943,1,0
    776553,936,115523,30-34,F,16,66765,8,11.04999971,1,0
    776563,936,115525,30-34,F,7,1369,0,0,1,1
    776579,936,115527,30-34,F,10,26910,5,7.229999781,1,0
    776603,936,115531,30-34,F,2,506,0,0,1,0
    776615,936,115533,45-49,M,63,11988,3,4.269999862,1,0
    776623,936,115535,45-49,M,64,19353,6,9.4799999,1,1
    776631,936,115536,40-44,M,29,10960,2,2.890000105,1,0
    776643,936,115538,30-34,M,15,33491,6,10.56999969,2,1
    776644,936,115538,30-34,M,15,20083,2,3.200000048,2,1
    776659,936,115541,30-34,M,16,8817,0,0,1,1
    776661,936,115541,30-34,M,16,15466,1,0.970000029,1,0
    776662,936,115541,30-34,M,16,27072,3,4.370000005,1,0
    776663,936,115541,30-34,M,16,15753,1,0.569999993,1,1
    776668,936,115542,40-44,M,19,3523,1,1.809999943,1,1
    776685,936,115545,40-44,M,16,7745,0,0,1,0
    776686,936,115545,40-44,M,16,18709,2,3.319999933,1,0
    776687,936,115545,40-44,M,16,8022,0,0,2,1
    776696,936,115547,30-34,M,10,7966,1,1.179999948,1,1
    776697,936,115547,30-34,M,10,4132,0,0,1,1
    776698,936,115547,30-34,M,10,12785,3,4.730000019,2,1
    776699,936,115547,30-34,M,10,8213,1,1.379999995,1,1
    776722,936,115551,30-34,M,2,545,0,0,1,1
    776725,936,115552,40-44,M,23,2479,1,1.25999999,1,0
    776780,936,115561,40-44,M,2,3812,2,3.049999952,1,0
    776793,936,115563,45-49,M,21,1609,0,0,1,0
    776799,936,115564,45-49,M,20,10257,3,3.579999924,1,1
    776817,936,115567,40-44,M,10,12356,4,6.279999971,1,0
    776825,936,115568,45-49,M,18,7410,1,1.210000038,1,0
    776829,936,115569,45-49,M,16,140098,28,46.63000011,1,0
    776831,936,115569,45-49,M,16,107021,20,34.44000012,1,0
    776840,936,115571,35-39,M,36,2797,1,1.289999962,1,0
    776861,936,115574,45-49,M,7,16461,6,9.21999979,1,0
    776892,936,115580,40-44,M,63,17488,5,7.719999909,1,0
    776928,936,115586,35-39,M,10,9750,2,1.5,1,1
    776935,936,115587,45-49,M,36,1136,0,0,1,1
    777105,936,115615,45-49,M,63,4333,1,0.180000007,1,1
    777130,936,115619,35-39,M,16,6260,0,0,1,0
    777131,936,115619,35-39,M,16,6359,0,0,1,0
    777166,936,115625,30-34,M,63,2383,0,0,1,1
    777187,936,115629,40-44,M,27,11292,3,5.389999866,1,1
    777198,936,115631,30-34,M,64,12729,4,5.779999852,1,0
    777200,936,115631,30-34,M,64,1898,0,0,1,1
    777201,936,115631,30-34,M,64,1882,0,0,1,1
    777235,936,115637,30-34,M,65,2883,1,0.99000001,1,1
    777248,936,115639,30-34,F,7,3989,1,1.279999971,1,0
    777261,936,115641,40-44,M,29,19603,4,5.279999971,1,1
    777382,936,115675,40-44,M,24,3047,1,1.379999995,1,0
    777398,936,115677,35-39,M,24,3029,1,1.049999952,1,1
    777410,936,115679,45-49,M,26,3490,1,1.340000033,1,1
    777482,936,115691,45-49,M,28,2479,0,0,1,0
    777495,936,115693,40-44,M,19,19581,7,10.42999983,2,0
    777519,936,115697,45-49,M,29,19537,5,6.099999905,1,0
    777625,936,115715,45-49,M,16,59433,12,19.65999949,3,0
    777627,936,115715,45-49,M,16,157534,33,56.19000077,2,0
    777638,936,115717,40-44,M,7,1781,0,0,1,1
    777670,936,115723,40-44,M,16,23769,4,6.029999852,1,0
    777673,936,115723,40-44,M,16,7101,0,0,1,0
    777742,936,115735,35-39,M,64,4726,1,1.830000043,1,1
    777758,936,115737,30-34,M,19,5209,1,0.959999979,2,0
    777794,936,115743,30-34,M,18,13473,3,2.619999945,3,0
    777816,936,115747,40-44,M,2,500,0,0,1,1
    777871,936,115756,30-34,M,20,4616,1,1.360000014,1,0
    777904,936,115762,30-34,M,31,3279,0,0,1,0
    777905,936,115762,30-34,M,31,3288,0,0,1,0
    778037,936,115784,35-39,M,27,14615,4,6.050000191,1,0
    778048,936,115786,30-34,M,27,56615,12,19.88000035,2,0
    778085,936,115792,30-34,M,26,11735,3,4.529999971,1,1
    778087,936,115792,30-34,M,26,15910,5,6.779999852,1,0
    778112,936,115796,35-39,M,29,11446,2,3.090000033,1,1
    778113,936,115796,35-39,M,29,4595,0,0,1,0
    778124,936,115798,30-34,M,29,4871,0,0,1,0
    778148,936,115802,35-39,M,28,3199,0,0,1,0
    778156,936,115804,30-34,M,28,9388,2,3.140000105,1,0
    778161,936,115804,30-34,M,28,17954,6,7.5400002,2,1
    778208,936,115812,40-44,F,29,2755,0,0,1,0
    778264,936,115822,40-44,F,27,8152,1,0.99000001,1,0
    778266,936,115822,40-44,F,27,74542,19,34.1500001,1,0
    778421,936,115848,40-44,F,20,6699,2,3.090000033,1,0
    778422,936,115848,40-44,F,20,11911,4,3.959999919,1,0
    778461,936,115854,40-44,M,29,10090,2,2.650000095,1,1
    778471,936,115856,30-34,M,32,1273,0,0,1,1
    778483,936,115858,40-44,F,18,24188,5,8.179999828,1,0
    778529,936,115866,30-34,M,31,2214,0,0,1,0
    778556,936,115870,40-44,M,32,9735,4,4.130000114,1,1
    778590,936,115876,30-34,M,30,1371,0,0,1,1
    778600,936,115878,40-44,F,22,10750,4,5.389999866,1,0
    778626,936,115882,30-34,M,29,7629,1,0.720000029,1,1
    778628,936,115882,30-34,M,29,4608,0,0,1,0
    778674,936,115890,35-39,M,29,3732,0,0,1,0
    778689,936,115892,30-34,M,28,7453,1,1.679999948,1,1
    778722,936,115898,35-39,F,64,41785,14,19.10000038,1,0
    778737,936,115900,35-39,M,27,8077,2,3.579999924,1,1
    778756,936,115904,35-39,F,63,5602,1,1.580000043,1,0
    778804,936,115912,30-34,M,26,6184,2,2.75,1,1
    778808,936,115912,30-34,M,26,1738,0,0,1,0
    778964,936,115938,35-39,F,27,112460,25,41.29000068,1,0
    779057,936,115954,40-44,M,15,4414,0,0,1,0
    779106,936,115962,35-39,F,30,14670,7,9.410000324,1,0
    779438,936,116031,30-34,F,64,33144,9,13.40999985,1,0
    779453,936,116033,45-49,M,64,4397,1,0.949999988,1,0
    779488,936,116039,45-49,M,65,1006,0,0,1,0
    779573,936,116053,35-39,F,10,89527,24,32.28999996,1,0
    779608,936,116059,35-39,F,15,2459,0,0,1,0
    779609,936,116059,35-39,F,15,7116,2,1.730000019,1,1
    779622,936,116061,30-34,F,15,8613,1,0.889999986,2,0
    779631,936,116063,35-39,F,16,9730,1,1.379999995,1,0
    779644,936,116065,30-34,F,16,51816,8,10.2299999,2,1
    779645,936,116065,30-34,F,16,27289,3,4.429999828,1,0
    779715,936,116077,30-34,F,29,20409,4,3.829999924,1,0
    779716,936,116077,30-34,F,29,8044,1,1.110000014,1,0
    779738,936,116081,30-34,F,28,15645,4,5.349999905,1,0
    779778,936,116087,30-34,F,31,2466,0,0,2,2
    779789,936,116089,45-49,M,10,11611,3,3.950000048,1,1
    779824,936,116095,45-49,M,7,9375,3,4.019999981,1,0
    779871,936,116103,30-34,F,32,4402,1,1.330000043,1,1
    779918,936,116111,30-34,F,18,8469,2,3.089999914,1,0
    779922,936,116111,30-34,F,18,5823,1,1.419999957,1,1
    779944,936,116115,35-39,M,10,2549,0,0,1,0
    779979,936,116121,35-39,M,16,25817,4,6.019999981,1,0
    779995,936,116123,30-34,F,20,1961,0,0,1,0
    780064,936,116135,30-34,F,22,2554,0,0,1,0
    780104,936,116147,30-34,F,25,4971,1,1.230000019,1,1
    780199,936,116163,35-39,F,23,1030,0,0,1,1
    780318,936,116183,45-49,F,29,162341,56,77.07999969,3,0
    780323,936,116183,45-49,F,29,24542,7,9.329999924,1,0
    780486,936,116216,30-34,F,65,2879,0,0,1,1
    780498,936,116218,30-34,F,64,13621,3,4.090000033,1,0
    780511,936,116220,30-34,F,63,6175,1,1.370000005,2,1
    780629,936,116240,30-34,F,28,2963,0,0,1,0
    780653,936,116244,30-34,F,29,9076,1,1.379999995,1,1
    780655,936,116244,30-34,F,29,20941,4,5.909999967,1,1
    780666,936,116246,45-49,F,10,3462,0,0,1,0
    780681,936,116248,30-34,F,26,4073,0,0,1,1
    780700,936,116252,30-34,F,27,3745,0,0,1,0
    780748,936,116265,30-34,F,24,830,0,0,1,0
    780759,936,116267,45-49,F,18,2912,0,0,1,0
    780760,936,116267,45-49,F,18,17167,5,6.910000086,1,0
    780797,936,116273,30-34,F,22,24491,7,9.539999962,1,0
    780799,936,116273,30-34,F,22,44699,13,17.30000037,2,0
    780821,936,116277,30-34,F,23,6469,2,1.309999943,1,0
    780830,936,116279,45-49,F,16,16053,3,4.079999924,1,1
    780835,936,116279,45-49,F,16,54724,12,17.92999995,1,1
    780867,936,116285,30-34,F,21,4706,1,1.220000029,1,0
    780974,936,116303,40-44,F,32,8316,3,4.569999933,1,1
    781066,936,116323,40-44,F,22,5794,2,2.269999981,1,0
    781114,936,116331,40-44,F,18,4813,1,1.029999971,1,0
    781159,936,116339,40-44,F,10,85285,26,36.13000035,1,0
    781162,936,116339,40-44,F,10,5839,1,1.370000005,1,0
    781175,936,116341,40-44,F,15,5859,1,1.539999962,1,0
    781187,936,116343,40-44,F,16,164118,41,59.06999993,1,0
    781195,936,116345,35-39,F,63,18234,6,7.810000062,1,0
    781207,936,116347,35-39,F,64,2755,0,0,1,0
    781303,936,116363,35-39,F,27,73676,20,28.5,1,0
    781305,936,116363,35-39,F,27,18421,7,10.07999992,1,0
    781327,936,116367,35-39,F,29,164754,49,67.97999978,2,1
    781353,936,116371,35-39,F,10,7449,1,1.639999986,1,1
    781354,936,116371,35-39,F,10,6424,1,0.529999971,1,0
    781438,936,116385,30-34,M,63,2086,0,0,1,0
    781470,936,116391,35-39,M,16,6016,0,0,1,0
    781499,936,116395,35-39,M,15,6412,1,1.370000005,1,0
    781508,936,116397,30-34,F,63,5040,1,1.440000057,1,0
    781556,936,116405,30-34,F,32,1772,0,0,1,0
    781559,936,116405,30-34,F,32,1783,0,0,1,0
    781606,936,116413,35-39,M,20,8200,3,3.919999957,1,0
    781690,936,116427,45-49,F,26,115896,38,49.44000006,1,0
    781811,936,116447,35-39,F,16,10186,1,1.230000019,1,1
    781857,936,116455,30-34,M,20,9134,3,4.180000067,2,0
    781858,936,116455,30-34,M,20,3385,1,1.440000057,1,1
    781907,936,116463,45-49,F,21,1314,0,0,1,0
    781928,936,116467,30-34,M,18,2916,0,0,1,1
    781929,936,116467,30-34,M,18,6142,1,1.330000043,1,0
    781950,936,116471,30-34,F,20,1984,0,0,1,0
    781999,936,116479,30-34,M,24,9142,3,3.749999881,1,0
    782001,936,116479,30-34,M,24,5475,2,2.730000019,1,1
    782022,936,116483,30-34,F,18,8254,2,2.320000052,1,1
    782026,936,116483,30-34,F,18,5704,1,1.320000052,1,0
    782130,936,116501,30-34,F,16,7301,0,0,1,0
    782134,936,116501,30-34,F,16,37873,5,6.169999957,1,1
    782135,936,116501,30-34,F,16,25267,4,4.940000057,2,1
    782171,936,116507,30-34,F,30,535,0,0,1,0
    782180,936,116509,30-34,M,29,3396,0,0,1,0
    782219,936,116515,30-34,M,26,977,0,0,1,0
    782228,936,116517,40-44,F,63,12318,5,6.340000153,1,1
    782242,936,116519,30-34,F,28,4783,1,0.860000014,1,0
    782275,936,116525,30-34,F,29,6475,1,1.350000024,1,0
    782337,936,116535,45-49,F,16,104578,29,39.25000095,1,1
    782407,936,116547,45-49,F,10,33664,11,12.51000035,1,0
    782443,936,116553,40-44,F,20,979,0,0,1,0
    782541,936,116569,40-44,F,28,7337,3,4.079999924,1,0
    782587,936,116577,30-34,M,10,2499,0,0,1,0
    782647,936,116587,40-44,F,27,11244,3,4.550000191,1,0
    782658,936,116589,30-34,M,15,4827,0,0,1,0
    782694,936,116595,35-39,F,29,29035,7,8.910000086,2,2
    782706,936,116597,35-39,F,30,761,0,0,1,0
    782754,936,116605,35-39,F,26,6532,1,1.610000014,1,0
    782815,936,116615,40-44,F,10,11537,3,4.300000191,1,0
    782816,936,116615,40-44,F,10,12183,3,2.869999945,1,0
    782862,936,116623,35-39,F,64,5912,1,1.559999943,1,1
    950068,936,123438,30-34,M,10,4012,1,1.570000052,1,0
    950078,936,123440,30-34,M,16,12396,2,3.210000038,2,1
    950079,936,123440,30-34,M,16,3142,0,0,2,2
    950099,936,123443,30-34,M,18,1120,0,0,1,0
    950109,936,123445,30-34,M,20,343,0,0,1,1
    950170,936,123455,30-34,M,15,1720,0,0,1,1
    950179,936,123457,30-34,M,16,3423,0,0,1,1
    950182,936,123457,30-34,M,16,3242,0,0,1,0
    950183,936,123457,30-34,M,16,15720,1,1.379999995,1,0
    950200,936,123460,30-34,M,10,1217,0,0,1,1
    950224,936,123464,40-44,M,20,2367,2,2.839999914,1,1
    950326,936,123481,35-39,M,16,6607,1,1.320000052,2,0
    950345,936,123484,30-34,M,64,616,0,0,1,0
    950452,936,123502,45-49,M,16,5537,1,1.519999981,1,0
    950463,936,123504,45-49,M,15,818,0,0,1,0
    950495,936,123509,45-49,M,21,1909,1,0.980000019,1,0
    950521,936,123514,30-34,M,21,351,0,0,1,0
    950531,936,123515,45-49,M,22,572,0,0,1,0
    950537,936,123516,40-44,M,36,1884,1,1.409999967,1,0
    950550,936,123519,30-34,M,30,219,0,0,1,0
    950577,936,123523,30-34,M,32,540,0,0,1,1
    950578,936,123523,30-34,M,32,550,0,0,1,0
    950595,936,123526,30-34,M,26,465,0,0,1,0
    950609,936,123528,30-34,M,29,1761,0,0,1,1
    950629,936,123532,30-34,M,65,152,0,0,1,1
    950631,936,123532,30-34,M,65,152,0,0,1,1
    950649,936,123535,30-34,M,64,429,0,0,1,0
    950745,936,123551,30-34,M,29,1514,0,0,2,2
    950770,936,123555,30-34,M,28,7780,3,4.329999924,2,2
    950772,936,123556,35-39,M,28,460,0,0,1,0
    950773,936,123556,35-39,M,28,471,0,0,1,0
    950776,936,123556,35-39,M,28,2633,1,1.070000052,1,0
    950787,936,123558,30-34,M,27,199,0,0,1,0
    950808,936,123562,35-39,M,32,398,0,0,1,0
    950839,936,123567,30-34,M,24,246,0,0,2,2
    950878,936,123573,40-44,M,10,2967,1,1.5,1,1
    950969,936,123588,45-49,M,36,255,0,0,1,0
    951021,936,123597,30-34,F,7,457,0,0,1,1
    951033,936,123599,30-34,F,10,5517,1,1.230000019,1,0
    951035,936,123599,30-34,F,10,1539,0,0,1,1
    951043,936,123601,30-34,F,16,3189,0,0,1,0
    951045,936,123601,30-34,F,16,3348,0,0,1,0
    951046,936,123601,30-34,F,16,20050,4,4.659999847,4,1
    951102,936,123611,45-49,M,16,2254,0,0,1,0
    951105,936,123611,45-49,M,16,5894,1,1.539999962,1,1
    951133,936,123616,35-39,M,16,9948,2,2.720000029,2,0
    951202,936,123627,45-49,F,26,5307,3,4.289999962,2,1
    951225,936,123631,35-39,F,22,4621,2,3.25,1,1
    951270,936,123639,35-39,F,18,784,0,0,1,1
    951282,936,123641,35-39,F,16,5775,1,1.580000043,1,1
    951285,936,123641,35-39,F,16,9297,2,2.619999886,2,1
    951294,936,123643,35-39,F,15,699,0,0,1,0
    951305,936,123644,35-39,F,10,1104,0,0,1,0
    951334,936,123649,30-34,F,64,3717,1,1.539999962,1,0
    951391,936,123659,30-34,F,28,2879,1,1.590000033,2,2
    951392,936,123659,30-34,F,28,2749,1,1.389999986,1,0
    951400,936,123660,45-49,F,10,24028,9,12.39000034,2,0
    951402,936,123661,30-34,F,29,1118,0,0,1,1
    951413,936,123662,30-34,F,26,1083,0,0,2,1
    951420,936,123664,30-34,F,27,843,0,0,1,0
    951444,936,123668,30-34,F,25,2983,1,0.970000029,1,0
    951448,936,123668,30-34,F,25,696,0,0,1,0
    951462,936,123671,45-49,F,16,7589,2,3.150000095,1,1
    951464,936,123671,45-49,F,16,20997,10,11.94999981,1,0
    951465,936,123671,45-49,F,16,4617,1,1.360000014,1,0
    951498,936,123677,45-49,F,20,259,0,0,1,0
    951508,936,123678,30-34,F,18,1134,0,0,1,0
    951542,936,123684,40-44,F,27,357,0,0,1,0
    951607,936,123695,40-44,F,10,848,0,0,1,1
    951608,936,123695,40-44,F,10,3149,1,1.480000019,1,0
    951641,936,123700,40-44,F,2,87,0,0,1,1
    951677,936,123706,35-39,F,27,2563,1,1.480000019,1,0
    951692,936,123709,35-39,F,10,1107,0,0,1,0
    951715,936,123713,45-49,F,64,10677,5,7.269999981,1,0
    951756,936,123720,35-39,F,22,2189,1,0.409999996,1,0
    951779,936,123723,45-49,F,27,3277,2,2.680000067,1,0
    951782,936,123724,45-49,F,26,781,0,0,1,0
    951810,936,123729,35-39,F,16,2226,0,0,1,0
    951812,936,123729,35-39,F,16,16274,4,6.079999924,2,0
    951837,936,123733,45-49,F,20,2077,1,1.50999999,1,1
    951853,936,123736,30-34,F,20,529,0,0,0,0
    951854,936,123736,30-34,F,20,487,0,0,1,0
    951856,936,123736,30-34,F,20,4626,2,2.099999905,2,0
    951941,936,123750,30-34,F,28,2764,1,1.559999943,1,1
    952001,936,123760,45-49,F,10,5447,2,2.960000038,1,0
    952031,936,123765,40-44,F,16,28169,8,12.36999989,1,1
    952080,936,123774,40-44,F,27,415,0,0,1,0
    952100,936,123777,35-39,F,29,810,0,0,1,1
    1121091,1178,144531,30-34,M,10,1194718,141,254.049996,28,14
    1121092,1178,144531,30-34,M,10,637648,67,122.4,13,5
    1121094,1178,144531,30-34,M,10,24362,0,0,1,1
    1121095,1178,144531,30-34,M,10,459690,50,86.33000112,5,2
    1121096,1178,144531,30-34,M,10,750060,86,161.9099991,11,2
    1121097,1178,144532,30-34,M,15,30068,1,1.820000052,1,0
    1121098,1178,144532,30-34,M,15,1267550,123,236.7699986,24,10
    1121100,1178,144532,30-34,M,15,3052003,340,639.9499981,60,17
    1121101,1178,144532,30-34,M,15,29945,1,1.590000033,2,1
    1121102,1178,144532,30-34,M,15,357856,30,52.97000015,7,3
    1121104,1178,144533,30-34,M,16,2080666,202,360.1500015,40,21
    1121105,1178,144533,30-34,M,16,145999,9,16.5200001,5,2
    1121107,1178,144533,30-34,M,16,32616,1,1.539999962,2,0
    1121108,1178,144533,30-34,M,16,984521,95,163.8999972,26,14
    1121110,1178,144534,30-34,M,18,880814,123,210.3600006,6,2
    1121111,1178,144534,30-34,M,18,182452,20,35.73000026,4,1
    1121113,1178,144534,30-34,M,18,894911,120,215.8399994,7,4
    1121114,1178,144534,30-34,M,18,31349,2,3.800000072,1,0
    1121115,1178,144535,30-34,M,19,410310,55,96.80000055,3,0
    1121116,1178,144535,30-34,M,19,572450,89,157.329998,7,4
    1121117,1178,144535,30-34,M,19,98759,15,26.56999946,1,1
    1121119,1178,144535,30-34,M,19,345371,54,93.08999991,7,3
    1121121,1178,144536,30-34,M,20,323899,46,78.9200002,5,1
    1121122,1178,144536,30-34,M,20,399199,58,103.1500002,3,0
    1121123,1178,144536,30-34,M,20,171202,22,36.53000021,3,1
    1121124,1178,144536,30-34,M,20,128386,15,28.85000002,2,1
    1121125,1178,144536,30-34,M,20,1034284,152,257.7099986,20,9
    1121126,1178,144536,30-34,M,20,45923,5,7.220000148,2,0
    1121127,1178,144537,30-34,M,21,40873,4,7.899999976,2,1
    1121128,1178,144537,30-34,M,21,286553,34,62.06000042,2,1
    1121129,1178,144537,30-34,M,21,20618,1,2.099999905,2,1
    1121131,1178,144537,30-34,M,21,83591,7,14.14000046,2,2
    1121132,1178,144537,30-34,M,21,114923,12,23.73000026,4,2
    1121133,1178,144538,30-34,M,22,25002,1,1.710000038,1,0
    1121134,1178,144538,30-34,M,22,68905,5,9.440000057,1,0
    1121136,1178,144538,30-34,M,22,169588,16,27.79999924,1,0
    1121138,1178,144538,30-34,M,22,328991,35,67.65000057,5,2
    1121141,1178,144539,30-34,M,23,23198,2,2.980000019,1,0
    1121142,1178,144539,30-34,M,23,26890,2,3.24000001,1,0
    1121143,1178,144539,30-34,M,23,221695,31,52.26000011,5,2
    1121152,1178,144541,30-34,M,24,88443,7,13.0400002,1,1
    1121153,1178,144541,30-34,M,24,187856,23,38.38999975,5,1
    1121164,1178,144545,30-34,M,25,570699,80,138.7699997,9,2
    1121167,1178,144545,30-34,M,25,1063508,145,260.3800013,23,7
    1121168,1178,144545,30-34,M,25,50523,6,8.549999952,1,0
    1121172,1178,144547,30-34,M,26,87935,9,15.63000023,1,0
    1121173,1178,144547,30-34,M,26,278225,33,60.19999957,3,0
    1121175,1178,144547,30-34,M,26,209461,20,34.19000006,1,0
    1121177,1178,144547,30-34,M,26,26316,2,3.24000001,3,0
    1121181,1178,144549,30-34,M,27,41030,3,5.140000105,2,1
    1121182,1178,144549,30-34,M,27,876671,120,216.5599982,22,4
    1121183,1178,144549,30-34,M,27,399392,53,93.07000041,5,0
    1121184,1178,144549,30-34,M,27,283858,30,56.05999923,1,0
    1121185,1178,144549,30-34,M,27,260699,31,54.09999871,5,2
    1121193,1178,144552,30-34,M,28,57781,5,7.800000072,2,1
    1121195,1178,144552,30-34,M,28,38757,3,5.220000029,1,0
    1121196,1178,144552,30-34,M,28,1392288,206,358.5500029,31,7
    1121197,1178,144552,30-34,M,28,1109387,159,280.9899995,13,2
    1121202,1178,144554,30-34,M,29,581281,65,115.1200008,10,5
    1121203,1178,144554,30-34,M,29,1048861,128,219.770002,22,8
    1121205,1178,144554,30-34,M,29,297452,30,52.01999986,4,1
    1121206,1178,144554,30-34,M,29,227925,22,35.30999994,22,12
    1121207,1178,144554,30-34,M,29,374175,38,63.32000101,8,3
    1121211,1178,144556,30-34,M,30,223586,32,54.24000037,1,0
    1121213,1178,144556,30-34,M,30,283170,39,65.22999996,2,1
    1121215,1178,144556,30-34,M,30,41636,3,4.210000038,1,0
    1121216,1178,144556,30-34,M,30,198658,30,48.60999978,8,1
    1121220,1178,144558,30-34,M,31,100596,10,13.91999972,4,2
    1121223,1178,144558,30-34,M,31,64020,5,11.0599997,1,0
    1121224,1178,144558,30-34,M,31,14289,0,0,1,0
    1121229,1178,144561,30-34,M,32,404866,43,87.42000079,4,0
    1121231,1178,144561,30-34,M,32,22256,1,1.659999967,1,1
    1121233,1178,144561,30-34,M,32,57690,4,6.74000001,1,0
    1121241,1178,144562,30-34,M,36,24952,5,8.220000267,3,2
    1121242,1178,144562,30-34,M,36,38900,3,5.580000043,1,0
    1121243,1178,144562,30-34,M,36,53520,6,9.2299999,1,1
    1121244,1178,144562,30-34,M,36,181683,20,34.22999972,2,1
    1121245,1178,144562,30-34,M,36,29185,2,3.149999976,1,0
    1121246,1178,144562,30-34,M,36,105047,13,20.2099994,3,1
    1121250,1178,144565,30-34,M,63,287976,31,59.43999982,3,2
    1121251,1178,144565,30-34,M,63,212175,22,38.58999968,2,1
    1121252,1178,144565,30-34,M,63,11139,0,0,1,1
    1121254,1178,144565,30-34,M,63,124005,11,21.84999979,4,1
    1121255,1178,144565,30-34,M,63,20423,1,1.960000038,1,0
    1121261,1178,144567,30-34,M,64,103001,14,22.32000005,1,0
    1121262,1178,144567,30-34,M,64,447420,66,110.2399991,7,2
    1121263,1178,144567,30-34,M,64,156101,19,29.75000048,2,2
    1121264,1178,144567,30-34,M,64,93015,12,18.47000015,1,0
    1121265,1178,144568,30-34,M,65,145398,23,36.24000025,1,0
    1121269,1178,144568,30-34,M,65,296413,50,76.43999958,3,1
    1121273,1178,144569,30-34,M,2,9370,0,0,1,1
    1121274,1178,144569,30-34,M,2,63785,7,11.80000019,6,2
    1121275,1178,144569,30-34,M,2,118522,14,26.81999981,2,1
    1121276,1178,144569,30-34,M,2,240123,38,65.67000115,5,4
    1121277,1178,144570,30-34,M,7,169108,20,32.24000025,2,1
    1121278,1178,144570,30-34,M,7,1044442,142,245.5999999,22,8
    1121279,1178,144570,30-34,M,7,93891,11,17.6400001,5,3
    1121282,1178,144570,30-34,M,7,185823,25,38.54999936,4,1
    1121284,1178,144571,30-34,M,66,175631,23,40.75999951,1,0
    1121285,1178,144571,30-34,M,66,37187,4,6.370000005,1,0
    1121286,1178,144571,30-34,M,66,10991,0,0,1,0
    1121287,1178,144571,30-34,M,66,344618,51,89.76000047,3,1
    1121289,1178,144572,35-39,M,10,98066,9,16.1500001,1,0
    1121290,1178,144572,35-39,M,10,770749,100,189.1299984,13,3
    1121291,1178,144572,35-39,M,10,52553,5,8.529999852,1,0
    1121292,1178,144572,35-39,M,10,362296,39,67.77000129,7,3
    1121293,1178,144572,35-39,M,10,427729,50,96.8999989,4,1
    1121296,1178,144573,35-39,M,15,180351,21,37.13000011,1,1
    1121297,1178,144573,35-39,M,15,187329,29,53.15999961,2,1
    1121300,1178,144573,35-39,M,15,782894,118,192.9299995,5,2
    1121302,1178,144574,35-39,M,16,1206533,128,236.1199988,17,6
    1121303,1178,144574,35-39,M,16,84494,7,12.57000017,2,0
    1121304,1178,144574,35-39,M,16,94257,7,12.5800004,1,1
    1121309,1178,144575,35-39,M,18,131060,16,28.04999959,2,1
    1121310,1178,144575,35-39,M,18,341603,50,83.48000121,4,2
    1121311,1178,144575,35-39,M,18,140749,19,30.4799999,1,1
    1121312,1178,144575,35-39,M,18,102525,13,20.29999983,2,1
    1121316,1178,144576,35-39,M,19,447952,68,131.5799983,8,1
    1121317,1178,144576,35-39,M,19,76355,9,14.62999988,2,0
    1121319,1178,144577,35-39,M,20,256598,38,64.46999931,6,1
    1121321,1178,144577,35-39,M,20,127476,21,30.15000057,3,2
    1121322,1178,144577,35-39,M,20,237603,37,62.25000024,5,2
    1121327,1178,144578,35-39,M,21,271091,42,78.03999984,3,1
    1121330,1178,144578,35-39,M,21,21743,2,3.400000095,1,0
    1121333,1178,144579,35-39,M,22,88970,10,14.8300004,2,0
    1121334,1178,144579,35-39,M,22,108362,13,22.42999983,1,1
    1121335,1178,144579,35-39,M,22,188596,27,44.14000034,3,0
    1121336,1178,144579,35-39,M,22,275080,43,69.65999997,4,3
    1121337,1178,144580,35-39,M,23,64647,10,16.26999998,1,0
    1121338,1178,144580,35-39,M,23,31265,4,5.789999902,1,0
    1121340,1178,144580,35-39,M,23,140147,24,42.08000016,2,0
    1121341,1178,144580,35-39,M,23,223120,40,67.66999984,1,0
    1121342,1178,144580,35-39,M,23,104869,18,34.07000089,1,0
    1121344,1178,144581,35-39,M,24,165177,23,41.71999967,4,1
    1121345,1178,144581,35-39,M,24,84194,11,19.56999981,1,0
    1121347,1178,144581,35-39,M,24,220581,31,57.37,1,1
    1121350,1178,144582,35-39,M,25,75804,10,17.36999965,2,1
    1121352,1178,144582,35-39,M,25,368986,59,100.289999,0,0
    1121353,1178,144582,35-39,M,25,28194,3,3.709999919,2,0
    1121355,1178,144583,35-39,M,26,99961,14,23.2099998,1,0
    1121359,1178,144583,35-39,M,26,7573,0,0,1,0
    1121361,1178,144584,35-39,M,27,685781,103,177.8899992,10,1
    1121364,1178,144584,35-39,M,27,274222,43,66.7700001,2,1
    1121365,1178,144584,35-39,M,27,110503,25,32.67999995,4,0
    1121367,1178,144585,35-39,M,28,1447755,233,420.5799983,11,8
    1121368,1178,144585,35-39,M,28,358987,52,87.55000067,1,0
    1121369,1178,144585,35-39,M,28,826205,125,232.3700008,5,1
    1121370,1178,144585,35-39,M,28,550954,84,150.1400012,3,0
    1121372,1178,144585,35-39,M,28,378350,55,96.48000073,4,0
    1121373,1178,144586,35-39,M,29,492784,56,95.5100013,7,4
    1121374,1178,144586,35-39,M,29,327158,43,72.3100003,6,2
    1121375,1178,144586,35-39,M,29,9921,0,0,1,0
    1121377,1178,144586,35-39,M,29,59390,5,9.209999919,5,3
    1121378,1178,144586,35-39,M,29,1040330,147,254.2500038,13,2
    1121379,1178,144587,35-39,M,30,49422,6,11.17000031,1,0
    1121380,1178,144587,35-39,M,30,131091,18,34.23000026,3,1
    1121381,1178,144587,35-39,M,30,95691,15,25.26000011,1,1
    1121390,1178,144588,35-39,M,31,15513,1,1.289999962,1,0
    1121391,1178,144589,35-39,M,32,382537,63,113.9900012,4,3
    1121394,1178,144589,35-39,M,32,461356,64,121.0999982,6,3
    1121395,1178,144589,35-39,M,32,392541,53,98.70000017,3,2
    1121398,1178,144590,35-39,M,36,35088,5,8.800000072,1,1
    1121400,1178,144590,35-39,M,36,53933,6,9.929999948,3,1
    1121403,1178,144591,35-39,M,63,228861,33,53.38999939,4,2
    1121405,1178,144591,35-39,M,63,20959,2,3.769999981,1,1
    1121410,1178,144592,35-39,M,64,24992,2,3.190000057,1,0
    1121411,1178,144592,35-39,M,64,100351,15,24.17999995,2,1
    1121412,1178,144592,35-39,M,64,292448,43,76.89999968,2,1
    1121413,1178,144592,35-39,M,64,65060,7,14.5200001,1,1
    1121414,1178,144592,35-39,M,64,133316,21,36.17000055,2,0
    1121415,1178,144593,35-39,M,65,113501,26,38.44000077,5,4
    1121418,1178,144593,35-39,M,65,192810,41,61.92999995,4,3
    1121421,1178,144594,35-39,M,2,233404,43,70.4100008,2,1
    1121422,1178,144594,35-39,M,2,128843,24,37.5999999,2,0
    1121423,1178,144594,35-39,M,2,63564,12,20.59000027,2,0
    1121425,1178,144594,35-39,M,2,85970,14,24.78000021,1,1
    1121428,1178,144595,35-39,M,7,131232,16,29.53999937,1,1
    1121429,1178,144595,35-39,M,7,152454,22,37.84999979,1,1
    1121430,1178,144595,35-39,M,7,28989,2,2.290000021,1,0
    1121433,1178,144596,35-39,M,66,80248,15,24.1900003,1,1
    1121437,1178,144596,35-39,M,66,38580,5,8.519999981,1,0
    1121439,1178,144597,40-44,M,10,621591,91,163.36,5,1
    1121440,1178,144597,40-44,M,10,250499,36,58.14000005,3,1
    1121442,1178,144597,40-44,M,10,131637,18,29.30999982,2,1
    1121443,1178,144597,40-44,M,10,463813,69,116.3399996,4,2
    1121444,1178,144597,40-44,M,10,211767,35,60.89999914,5,1
    1121446,1178,144598,40-44,M,15,163181,26,40.02000093,1,1
    1121451,1178,144599,40-44,M,16,1117385,147,260.0699984,11,2
    1121452,1178,144599,40-44,M,16,1663441,205,359.4700001,17,6
    1121453,1178,144599,40-44,M,16,455248,54,105.7099996,5,2
    1121454,1178,144599,40-44,M,16,75589,6,10.66000009,1,1
    1121455,1178,144599,40-44,M,16,594267,82,143.3000009,3,2
    1121456,1178,144599,40-44,M,16,315281,35,65.02999854,1,0
    1121464,1178,144601,40-44,M,19,363456,71,117.5599997,7,1
    1121466,1178,144601,40-44,M,19,438983,81,143.4300001,3,1
    1121467,1178,144601,40-44,M,19,42563,5,9.659999847,1,1
    1121469,1178,144602,40-44,M,20,399035,75,124.7999995,7,3
    1121471,1178,144602,40-44,M,20,304680,59,98.55000019,3,0
    1121472,1178,144602,40-44,M,20,140596,23,40.77000022,1,0
    1121473,1178,144602,40-44,M,20,439986,80,134.8799999,4,3
    1121474,1178,144602,40-44,M,20,75803,11,19.3599999,2,2
    1121477,1178,144603,40-44,M,21,7073,0,0,1,0
    1121481,1178,144604,40-44,M,22,153586,28,43.01000035,2,0
    1121482,1178,144604,40-44,M,22,180815,31,42.62999976,1,0
    1121483,1178,144604,40-44,M,22,253169,51,75.78999984,1,0
    1121484,1178,144604,40-44,M,22,34453,5,7.710000038,1,1
    1121487,1178,144605,40-44,M,23,51550,8,14.03999984,1,0
    1121489,1178,144605,40-44,M,23,110018,24,39.85999966,1,0
    1121493,1178,144606,40-44,M,24,137584,21,36.77999961,1,0
    1121497,1178,144606,40-44,M,24,209825,30,54.86999953,1,0
    1121499,1178,144607,40-44,M,25,264222,63,87.7899996,1,1
    1121510,1178,144608,40-44,M,26,31202,5,6.730000019,1,0
    1121511,1178,144609,40-44,M,27,252991,49,76.83999932,3,0
    1121514,1178,144609,40-44,M,27,56265,9,15.53999972,1,0
    1121523,1178,144611,40-44,M,29,76923,11,17.67000008,2,2
    1121524,1178,144611,40-44,M,29,209332,30,49.60000014,3,1
    1121525,1178,144611,40-44,M,29,214094,31,53.26999903,1,0
    1121526,1178,144611,40-44,M,29,526209,85,126.9299996,3,2
    1121527,1178,144611,40-44,M,29,741143,120,179.620001,4,1
    1121528,1178,144611,40-44,M,29,172827,25,38.42000043,2,0
    1121530,1178,144612,40-44,M,30,188873,38,58.5999999,1,1
    1121532,1178,144612,40-44,M,30,123126,25,39.72999978,2,1
    1121535,1178,144613,40-44,M,31,77794,14,19.11000001,1,1
    1121541,1178,144614,40-44,M,32,56630,9,15.81000018,1,1
    1121544,1178,144614,40-44,M,32,400844,85,140.9700022,4,2
    1121545,1178,144614,40-44,M,32,208572,36,60.76000023,2,1
    1121548,1178,144615,40-44,M,36,59004,8,13.51000011,1,0
    1121551,1178,144615,40-44,M,36,196253,32,55.10000002,1,0
    1121554,1178,144616,40-44,M,63,51858,8,12.63000011,1,1
    1121557,1178,144616,40-44,M,63,280764,49,81.36000025,2,1
    1121561,1178,144617,40-44,M,64,63660,11,16.47000003,1,1
    1121562,1178,144617,40-44,M,64,109289,19,31.02999997,1,0
    1121568,1178,144618,40-44,M,65,188440,40,60.72999966,2,1
    1121571,1178,144619,40-44,M,2,212496,44,74.83000135,2,1
    1121572,1178,144619,40-44,M,2,32574,5,7.480000019,1,0
    1121575,1178,144619,40-44,M,2,128595,23,36.4800005,1,1
    1121577,1178,144620,40-44,M,7,242234,48,68.06000054,2,0
    1121584,1178,144621,40-44,M,66,33154,5,7.879999995,1,1
    1121585,1178,144621,40-44,M,66,9773,1,1.460000038,1,0
    1121589,1178,144622,45-49,M,10,464036,77,123.5500004,3,1
    1121590,1178,144622,45-49,M,10,478480,75,135.7500012,3,1
    1121592,1178,144622,45-49,M,10,428812,66,116.8800001,4,2
    1121593,1178,144622,45-49,M,10,1177535,221,365.6600009,15,3
    1121594,1178,144622,45-49,M,10,426500,72,128.2799988,4,1
    1121597,1178,144623,45-49,M,15,54237,7,10.77999985,2,1
    1121598,1178,144623,45-49,M,15,506916,89,133.6999986,2,2
    1121599,1178,144623,45-49,M,15,250960,42,64.87999952,2,0
    1121601,1178,144624,45-49,M,16,2286228,353,603.380002,16,7
    1121602,1178,144624,45-49,M,16,915451,125,220.559999,6,1
    1121603,1178,144624,45-49,M,16,159478,20,33.89999998,3,1
    1121605,1178,144624,45-49,M,16,1228924,190,318.9700032,6,3
    1121606,1178,144624,45-49,M,16,938283,134,248.6400001,7,2
    1121607,1178,144625,45-49,M,18,154572,26,40.93000007,1,1
    1121609,1178,144625,45-49,M,18,378171,70,109.2500008,1,0
    1121612,1178,144625,45-49,M,18,468749,84,134.1199975,6,1
    1121613,1178,144626,45-49,M,19,309823,60,103.3899996,4,4
    1121615,1178,144626,45-49,M,19,327227,65,116.5599996,5,0
    1121616,1178,144626,45-49,M,19,334945,72,120.2999994,2,1
    1121617,1178,144626,45-49,M,19,68859,15,25.45999968,1,0
    1121619,1178,144627,45-49,M,20,127125,20,35.67999983,2,0
    1121620,1178,144627,45-49,M,20,415798,80,131.7800006,3,1
    1121622,1178,144627,45-49,M,20,107671,20,29.91000021,1,1
    1121623,1178,144627,45-49,M,20,164356,28,46.7900002,2,1
    1121624,1178,144627,45-49,M,20,17662,2,3.189999938,1,0
    1121627,1178,144628,45-49,M,21,65339,10,16.67999983,2,0
    1121628,1178,144628,45-49,M,21,59838,7,11.11000013,1,0
    1121629,1178,144628,45-49,M,21,381577,81,127.5699993,2,0
    1121635,1178,144629,45-49,M,22,45491,8,11.00999999,1,0
    1121638,1178,144630,45-49,M,23,18946,2,3.599999905,1,0
    1121641,1178,144630,45-49,M,23,114370,18,33.65999997,1,0
    1121642,1178,144630,45-49,M,23,99698,21,33.3499999,1,0
    1121644,1178,144631,45-49,M,24,355165,81,128.6099997,4,3
    1121650,1178,144632,45-49,M,25,101431,23,33.93000031,1,1
    1121652,1178,144632,45-49,M,25,123151,24,36.4400003,2,1
    1121660,1178,144633,45-49,M,26,24078,4,5.769999981,1,0
    1121661,1178,144634,45-49,M,27,517801,105,181.7200011,3,0
    1121662,1178,144634,45-49,M,27,145104,25,41.42000008,2,1
    1121664,1178,144634,45-49,M,27,179950,35,58.67999971,1,0
    1121665,1178,144634,45-49,M,27,258531,46,80.33999979,2,0
    1121666,1178,144634,45-49,M,27,272500,62,104.4599996,3,0
    1121667,1178,144635,45-49,M,28,273197,57,87.7300005,3,0
    1121668,1178,144635,45-49,M,28,775904,172,253.990002,4,2
    1121669,1178,144635,45-49,M,28,120251,26,39.44000006,1,0
    1121671,1178,144635,45-49,M,28,139406,24,39.04999948,1,0
    1121672,1178,144635,45-49,M,28,60314,11,16.93999958,2,1
    1121673,1178,144636,45-49,M,29,563074,86,142.7099985,4,2
    1121674,1178,144636,45-49,M,29,168655,18,27.29999983,2,0
    1121675,1178,144636,45-49,M,29,111963,17,29.3799994,2,1
    1121676,1178,144636,45-49,M,29,1026304,168,277.5799986,17,8
    1121677,1178,144636,45-49,M,29,1391924,258,422.8400038,17,10
    1121678,1178,144636,45-49,M,29,147551,22,38.50000083,1,0
    1121685,1178,144638,45-49,M,31,66794,9,17.3299998,1,1
    1121687,1178,144638,45-49,M,31,118882,19,32.30999994,2,1
    1121689,1178,144638,45-49,M,31,148010,24,41.96999943,1,0
    1121691,1178,144639,45-49,M,32,932890,197,352.4499989,3,1
    1121692,1178,144639,45-49,M,32,718359,147,264.5899997,4,1
    1121693,1178,144639,45-49,M,32,433658,82,158.5999998,5,2
    1121695,1178,144639,45-49,M,32,29455,3,4.769999981,1,0
    1121701,1178,144640,45-49,M,36,23973,3,4.820000052,1,1
    1121705,1178,144641,45-49,M,63,126480,25,37.25999999,1,1
    1121706,1178,144641,45-49,M,63,138959,28,39.5200007,1,0
    1121708,1178,144641,45-49,M,63,68829,12,19.47999978,1,0
    1121711,1178,144642,45-49,M,64,49916,10,16.38,1,1
    1121716,1178,144643,45-49,M,65,76014,16,22.67000031,1,1
    1121723,1178,144644,45-49,M,2,50947,10,15.99000025,1,0
    1121733,1178,144646,45-49,M,66,55536,11,17.04999995,1,0
    1121741,1178,144647,30-34,F,10,318042,46,64.40999997,8,4
    1121742,1178,144647,30-34,F,10,213016,30,44.21999955,8,2
    1121745,1178,144648,30-34,F,15,182265,27,38.18000007,2,1
    1121746,1178,144648,30-34,F,15,1117371,177,268.050002,26,5
    1121749,1178,144648,30-34,F,15,333345,52,77.59000027,5,1
    1121751,1178,144649,30-34,F,16,275930,30,46.77999997,5,2
    1121753,1178,144649,30-34,F,16,740631,101,153.1199975,9,1
    1121754,1178,144649,30-34,F,16,328272,35,55.99000025,2,1
    1121755,1178,144649,30-34,F,16,178455,20,31.5400002,6,3
    1121756,1178,144649,30-34,F,16,705712,98,147.339999,6,1
    1121758,1178,144650,30-34,F,18,690373,91,159.5700021,5,2
    1121759,1178,144650,30-34,F,18,515812,69,117.6299995,3,1
    1121760,1178,144650,30-34,F,18,764793,101,171.9799976,4,2
    1121763,1178,144651,30-34,F,19,87832,11,18.10000038,1,1
    1121764,1178,144651,30-34,F,19,23368,3,4.300000191,1,0
    1121765,1178,144651,30-34,F,19,51509,7,11.57000005,1,0
    1121767,1178,144651,30-34,F,19,87043,16,24.48000002,2,0
    1121768,1178,144651,30-34,F,19,565565,113,169.6699982,7,4
    1121769,1178,144652,30-34,F,20,253758,43,62.14000034,4,1
    1121773,1178,144652,30-34,F,20,319131,51,76.68000025,6,1
    1121774,1178,144652,30-34,F,20,670608,130,195.1499978,11,3
    1121775,1178,144653,30-34,F,21,159123,25,38.36000013,5,3
    1121776,1178,144653,30-34,F,21,103709,15,24.56999969,3,1
    1121779,1178,144653,30-34,F,21,271589,45,74.41000032,9,3
    1121780,1178,144653,30-34,F,21,119772,20,33.46999907,5,2
    1121782,1178,144654,30-34,F,22,26340,3,4.220000029,1,1
    1121783,1178,144654,30-34,F,22,594968,111,147.6700006,4,0
    1121791,1178,144655,30-34,F,23,6838,0,0,1,0
    1121793,1178,144656,30-34,F,24,185665,39,62.14000058,1,0
    1121795,1178,144656,30-34,F,24,24959,3,4.560000062,1,1
    1121796,1178,144656,30-34,F,24,136967,23,35.05999982,3,1
    1121798,1178,144656,30-34,F,24,107548,19,29.31000018,1,0
    1121803,1178,144657,30-34,F,25,588617,119,169.9199973,2,0
    1121806,1178,144658,30-34,F,26,190560,26,41.63,3,1
    1121807,1178,144658,30-34,F,26,373110,49,75.70000076,4,2
    1121812,1178,144659,30-34,F,27,935646,170,256.4699982,19,6
    1121814,1178,144659,30-34,F,27,2223278,421,612.3000032,38,13
    1121815,1178,144659,30-34,F,27,240497,36,51.84000087,1,0
    1121816,1178,144659,30-34,F,27,259984,37,54.7900002,5,0
    1121817,1178,144660,30-34,F,28,606786,127,179.050001,11,3
    1121818,1178,144660,30-34,F,28,83270,13,17.74000001,1,0
    1121819,1178,144660,30-34,F,28,1189509,268,375.7199963,7,3
    1121820,1178,144660,30-34,F,28,11471,1,1.570000052,0,0
    1121824,1178,144661,30-34,F,29,1705246,295,429.4799981,23,10
    1121826,1178,144661,30-34,F,29,418016,63,95.8500005,3,1
    1121827,1178,144661,30-34,F,29,30155,3,3.819999933,1,0
    1121828,1178,144661,30-34,F,29,990404,153,226.5399992,12,6
    1121829,1178,144662,30-34,F,30,187468,34,50.72000062,2,1
    1121832,1178,144662,30-34,F,30,208301,33,54.57000089,1,0
    1121833,1178,144662,30-34,F,30,101856,16,25.22000039,4,1
    1121835,1178,144663,30-34,F,31,48935,7,9.970000267,1,1
    1121839,1178,144663,30-34,F,31,13911,1,1.730000019,1,1
    1121841,1178,144664,30-34,F,32,511726,77,123.0900019,8,4
    1121843,1178,144664,30-34,F,32,177452,24,37.83000016,2,0
    1121844,1178,144664,30-34,F,32,149808,20,33.03999937,1,1
    1121845,1178,144664,30-34,F,32,390339,60,105.0199997,9,6
    1121846,1178,144664,30-34,F,32,8350,0,0,1,0
    1121847,1178,144665,30-34,F,36,39339,4,5.929999948,1,0
    1121854,1178,144666,30-34,F,63,8587,0,0,1,0
    1121855,1178,144666,30-34,F,63,24893,2,3.75,1,0
    1121856,1178,144666,30-34,F,63,1296189,212,343.2599944,14,4
    1121857,1178,144666,30-34,F,63,91607,12,19.1899997,2,1
    1121859,1178,144667,30-34,F,64,238036,38,61.02999771,6,3
    1121860,1178,144667,30-34,F,64,254344,35,56.16999996,2,1
    1121861,1178,144667,30-34,F,64,157705,23,39.23000026,2,0
    1121862,1178,144667,30-34,F,64,411571,60,99.1799984,6,1
    1121863,1178,144667,30-34,F,64,94136,11,16.17999971,1,0
    1121867,1178,144668,30-34,F,65,82640,16,23.97000039,1,1
    1121869,1178,144668,30-34,F,65,17870,2,2.620000005,1,1
    1121871,1178,144669,30-34,F,2,19178,2,2.779999971,1,1
    1121873,1178,144669,30-34,F,2,5264,0,0,1,0
    1121874,1178,144669,30-34,F,2,145548,28,42.37000036,2,1
    1121876,1178,144669,30-34,F,2,82455,15,22.04999971,1,0
    1121877,1178,144670,30-34,F,7,44189,7,10.31999981,2,0
    1121878,1178,144670,30-34,F,7,45199,7,9.809999943,1,0
    1121881,1178,144670,30-34,F,7,221843,43,63.45000076,5,0
    1121888,1178,144671,30-34,F,66,41672,6,10.54999995,2,1
    1121889,1178,144672,35-39,F,10,127546,25,38.94000041,2,0
    1121890,1178,144672,35-39,F,10,127865,28,38.02999961,3,1
    1121891,1178,144672,35-39,F,10,1025327,229,314.2999983,16,2
    1121894,1178,144672,35-39,F,10,561415,124,173.76,3,0
    1121895,1178,144673,35-39,F,15,132803,25,37.32000124,2,1
    1121897,1178,144673,35-39,F,15,24664,2,2.629999995,1,1
    1121901,1178,144674,35-39,F,16,1020561,172,263.8100007,7,3
    1121902,1178,144674,35-39,F,16,682143,114,177.1099993,6,2
    1121903,1178,144674,35-39,F,16,1247717,222,343.4199994,11,4
    1121904,1178,144674,35-39,F,16,146406,23,33.22999942,1,1
    1121905,1178,144674,35-39,F,16,905699,161,234.6599982,4,1
    1121906,1178,144674,35-39,F,16,1184580,194,297.8299981,14,3
    1121907,1178,144675,35-39,F,18,98057,20,31.00999963,1,1
    1121917,1178,144676,35-39,F,19,238735,56,84.65999889,4,1
    1121918,1178,144676,35-39,F,19,320657,77,115.8800026,2,0
    1121925,1178,144678,35-39,F,21,244074,57,84.51000023,4,2
    1121928,1178,144678,35-39,F,21,39146,8,13.05999959,1,0
    1121931,1178,144679,35-39,F,22,78468,15,23.64999962,1,0
    1121933,1178,144679,35-39,F,22,325653,63,89.35000026,2,0
    1121935,1178,144679,35-39,F,22,66277,12,17.30000019,1,0
    1121936,1178,144679,35-39,F,22,93002,16,23.33999968,1,0
    1121944,1178,144681,35-39,F,24,109723,27,40.9600004,1,0
    1121948,1178,144681,35-39,F,24,118941,35,50.11000001,4,1
    1121949,1178,144682,35-39,F,25,221576,47,66.79000068,6,1
    1121953,1178,144682,35-39,F,25,8341,1,1.639999986,1,0
    1121954,1178,144682,35-39,F,25,120335,26,36.2299993,2,0
    1121955,1178,144683,35-39,F,26,182098,40,62.86999989,1,1
    1121956,1178,144683,35-39,F,26,227473,52,71.58000052,1,1
    1121962,1178,144684,35-39,F,27,1050947,230,350.5099957,6,1
    1121963,1178,144684,35-39,F,27,720859,162,213.6899986,13,5
    1121971,1178,144685,35-39,F,28,41111,8,10.96000016,1,0
    1121973,1178,144686,35-39,F,29,148616,25,37.39999962,6,4
    1121976,1178,144686,35-39,F,29,707260,135,210.8200028,13,6
    1121977,1178,144686,35-39,F,29,139596,26,42.41000032,1,1
    1121983,1178,144687,35-39,F,30,105399,22,33.19999933,2,0
    1121994,1178,144689,35-39,F,32,222378,50,72.91000104,1,0
    1122003,1178,144691,35-39,F,63,975792,210,293.8800011,10,4
    1122004,1178,144691,35-39,F,63,579150,125,167.0499997,5,1
    1122005,1178,144691,35-39,F,63,449588,81,123.800001,5,2
    1122006,1178,144691,35-39,F,63,318157,56,85.70000196,3,0
    1122007,1178,144691,35-39,F,63,196967,43,65.17999971,2,1
    1122011,1178,144692,35-39,F,64,158298,37,46.43000007,4,1
    1122012,1178,144692,35-39,F,64,222739,55,68.55999959,5,2
    1122022,1178,144694,35-39,F,2,20780,5,8.189999938,1,0
    1122027,1178,144695,35-39,F,7,128616,33,48.54999948,2,0
    1122039,1178,144697,40-44,F,10,258954,61,82.27999902,1,0
    1122040,1178,144697,40-44,F,10,205289,48,71.53000104,3,0
    1122041,1178,144697,40-44,F,10,611601,138,191.419996,8,3
    1122043,1178,144697,40-44,F,10,947657,233,321.8700004,8,4
    1122044,1178,144697,40-44,F,10,233043,49,65.03000033,2,0
    1122047,1178,144698,40-44,F,15,582725,142,194.8099988,9,2
    1122052,1178,144699,40-44,F,16,265038,51,78.45999932,2,1
    1122054,1178,144699,40-44,F,16,222273,39,53.62999868,6,1
    1122055,1178,144699,40-44,F,16,797234,170,243.7699978,4,1
    1122056,1178,144699,40-44,F,16,925555,182,262.8899981,4,2
    1122058,1178,144700,40-44,F,18,22210,3,4.050000191,1,1
    1122075,1178,144703,40-44,F,21,46391,11,16.40999985,3,1
    1122078,1178,144703,40-44,F,21,190477,42,66.38999987,1,0
    1122079,1178,144703,40-44,F,21,25382,7,9.609999895,1,0
    1122085,1178,144704,40-44,F,22,65726,17,22.12000012,2,0
    1122089,1178,144705,40-44,F,23,195220,51,78.06000042,1,0
    1122092,1178,144705,40-44,F,23,107501,27,40.87999928,2,2
    1122101,1178,144707,40-44,F,25,197772,63,88.21000016,7,2
    1122102,1178,144707,40-44,F,25,138154,35,48.93999863,1,0
    1122103,1178,144707,40-44,F,25,270124,69,95.84999895,2,0
    1122105,1178,144708,40-44,F,26,303971,77,106.9299998,11,6
    1122107,1178,144708,40-44,F,26,682046,183,254.419997,4,2
    1122109,1178,144708,40-44,F,26,328365,83,117.3400005,2,1
    1122112,1178,144709,40-44,F,27,1083259,276,390.2599992,11,0
    1122113,1178,144709,40-44,F,27,913929,245,340.4099993,7,2
    1122118,1178,144710,40-44,F,28,101586,24,33.47000039,2,1
    1122120,1178,144710,40-44,F,28,181053,46,66.27999985,3,1
    1122121,1178,144710,40-44,F,28,133419,35,48.18000007,2,1
    1122125,1178,144711,40-44,F,29,489573,113,156.1199993,3,2
    1122127,1178,144711,40-44,F,29,822023,194,288.3300035,6,0
    1122131,1178,144712,40-44,F,30,93176,29,40.37000024,1,1
    1122138,1178,144713,40-44,F,31,47229,13,19.27999985,1,0
    1122139,1178,144713,40-44,F,31,92263,24,34.03000015,1,0
    1122140,1178,144713,40-44,F,31,81551,21,29.67000008,1,0
    1122145,1178,144714,40-44,F,32,141037,32,47.78999913,3,0
    1122146,1178,144714,40-44,F,32,319501,79,111.6500003,0,0
    1122149,1178,144715,40-44,F,36,72741,19,24.33000016,2,0
    1122154,1178,144716,40-44,F,63,597419,135,188.5100002,2,1
    1122157,1178,144716,40-44,F,63,98768,21,33.14000034,1,1
    1122160,1178,144717,40-44,F,64,173165,41,59.85000026,1,0
    1122165,1178,144718,40-44,F,65,55823,13,21.10999966,1,1
    1122166,1178,144718,40-44,F,65,118451,28,38.35000062,4,1
    1122176,1178,144719,40-44,F,2,74424,22,30.84000027,1,1
    1122177,1178,144720,40-44,F,7,47929,12,14.58999991,1,1
    1122182,1178,144720,40-44,F,7,40801,12,15.91999972,0,0
    1122183,1178,144721,40-44,F,66,66017,17,24.22000015,1,0
    1122189,1178,144722,45-49,F,10,725043,179,238.4000007,5,3
    1122191,1178,144722,45-49,F,10,382776,97,132.7300007,5,1
    1122192,1178,144722,45-49,F,10,548250,137,201.6000042,5,1
    1122193,1178,144722,45-49,F,10,1358324,346,465.0799981,8,2
    1122197,1178,144723,45-49,F,15,662249,163,234.9399992,2,0
    1122200,1178,144723,45-49,F,15,559554,139,195.0799994,2,0
    1122201,1178,144724,45-49,F,16,320757,68,104.6899989,2,0
    1122202,1178,144724,45-49,F,16,906151,202,295.5499957,1,0
    1122203,1178,144724,45-49,F,16,699314,164,226.0300014,3,0
    1122204,1178,144724,45-49,F,16,850337,198,287.690003,3,1
    1122205,1178,144724,45-49,F,16,1015460,247,315.9000051,9,2
    1122209,1178,144725,45-49,F,18,890295,227,332.9899989,1,0
    1122210,1178,144725,45-49,F,18,791817,194,282.490001,4,2
    1122211,1178,144725,45-49,F,18,317601,76,115.6600008,1,0
    1122212,1178,144725,45-49,F,18,685211,164,247.3200026,4,3
    1122213,1178,144726,45-49,F,19,32781,7,11.20000017,2,2
    1122216,1178,144726,45-49,F,19,76785,19,25.45999998,3,0
    1122217,1178,144726,45-49,F,19,719083,206,299.5299983,12,5
    1122223,1178,144727,45-49,F,20,368480,107,140.4200011,5,4
    1122224,1178,144727,45-49,F,20,260945,73,100.8800011,2,2
    1122225,1178,144728,45-49,F,21,40998,10,13.35000038,1,0
    1122227,1178,144728,45-49,F,21,183293,53,73.74999964,2,1
    1122232,1178,144729,45-49,F,22,221561,55,76.75999916,1,0
    1122233,1178,144729,45-49,F,22,436943,109,145.8199974,1,1
    1122240,1178,144730,45-49,F,23,284488,90,125.2700011,1,1
    1122244,1178,144731,45-49,F,24,85083,32,38.62999976,1,1
    1122246,1178,144731,45-49,F,24,14167,5,7.139999986,1,0
    1122249,1178,144732,45-49,F,25,300637,84,116.9899981,2,0
    1122253,1178,144732,45-49,F,25,449921,129,175.9700005,5,1
    1122254,1178,144732,45-49,F,25,282899,71,105.6600007,1,0
    1122257,1178,144733,45-49,F,26,669671,186,259.1799988,4,1
    1122258,1178,144733,45-49,F,26,108655,28,46.92000186,1,0
    1122260,1178,144733,45-49,F,26,536248,146,187.7399978,3,0
    1122262,1178,144734,45-49,F,27,1055017,265,380.6599952,16,2
    1122265,1178,144734,45-49,F,27,1428421,367,541.7000023,10,0
    1122266,1178,144734,45-49,F,27,1088027,272,409.5600026,9,4
    1122267,1178,144735,45-49,F,28,288517,78,102.3900002,3,0
    1122268,1178,144735,45-49,F,28,202231,53,67.13000107,3,1
    1122270,1178,144735,45-49,F,28,73222,16,22.86000025,1,0
    1122271,1178,144735,45-49,F,28,348542,96,134.889999,2,0
    1122273,1178,144736,45-49,F,29,1097966,266,369.069997,16,8
    1122274,1178,144736,45-49,F,29,526923,138,198.0899972,2,1
    1122276,1178,144736,45-49,F,29,264386,66,91.00000054,4,1
    1122277,1178,144736,45-49,F,29,854940,227,297.9100007,8,3
    1122279,1178,144737,45-49,F,30,113567,34,50.29000044,3,0
    1122282,1178,144737,45-49,F,30,22859,6,9.419999838,1,0
    1122288,1178,144738,45-49,F,31,51754,13,20.51999998,1,0
    1122290,1178,144738,45-49,F,31,104347,28,38.13999993,4,3
    1122303,1178,144741,45-49,F,63,391998,97,142.0500025,3,1
    1122304,1178,144741,45-49,F,63,1111156,282,402.3000026,5,0
    1122308,1178,144741,45-49,F,63,427772,117,159.299999,3,1
    1122310,1178,144742,45-49,F,64,536457,136,193.6599991,2,1
    1122311,1178,144742,45-49,F,64,179894,43,66.83999872,2,0
    1122312,1178,144742,45-49,F,64,479882,131,178.6700007,6,0
    1122313,1178,144742,45-49,F,64,358261,91,130.3600011,1,0
    1122316,1178,144743,45-49,F,65,346688,88,114.8599998,2,0
    1314296,1178,179863,30-34,M,100,33445,2,3.199999928,1,0
    1314297,1178,179864,30-34,M,101,72228,5,7.529999852,4,4
    1314298,1178,179865,30-34,M,102,49699,2,2.690000057,2,1
    1314299,1178,179866,30-34,M,103,189761,18,27.32999969,4,1
    1314301,1178,179868,30-34,M,105,312524,37,53.78999972,2,0
    1314303,1178,179870,30-34,M,107,496760,42,61.00999904,10,3
    1314306,1178,179873,30-34,M,110,310988,34,46.66999936,11,3
    1314307,1178,179874,30-34,M,111,98606,9,12.10999984,1,0
    1314308,1178,179875,30-34,M,112,51104,2,3.199999928,3,1
    1314309,1178,179876,30-34,M,113,276762,22,32.09000015,5,1
    1314312,1178,179879,35-39,M,101,33534,2,2.960000038,1,1
    1314313,1178,179880,35-39,M,102,128859,16,23.69999957,1,0
    1314314,1178,179881,35-39,M,103,92080,12,16.94000018,3,2
    1314316,1178,179883,35-39,M,105,211882,33,46.64999926,3,1
    1314318,1178,179885,35-39,M,107,112776,9,12.67999995,1,0
    1314319,1178,179886,35-39,M,108,145324,14,19.82000005,2,1
    1314320,1178,179887,35-39,M,109,106492,14,21.26000023,2,0
    1314321,1178,179888,35-39,M,110,233845,30,40.73000062,3,0
    1314323,1178,179890,35-39,M,112,155426,17,25.01000023,3,0
    1314324,1178,179891,35-39,M,113,97540,8,11.5199995,2,1
    1314325,1178,179892,35-39,M,114,61441,5,7.700000048,1,0
    1314326,1178,179893,40-44,M,100,76703,9,12.14999962,3,1
    1314327,1178,179894,40-44,M,101,68619,10,14.96000034,1,0
    1314330,1178,179897,40-44,M,104,17559,1,1.49000001,1,1
    1314331,1178,179898,40-44,M,105,137879,19,28.47000003,2,0
    1314332,1178,179899,40-44,M,106,67710,10,15.14999998,1,0
    1314333,1178,179900,40-44,M,107,348180,41,60.22999907,3,1
    1314334,1178,179901,40-44,M,108,146246,18,28.71999955,3,1
    1314336,1178,179903,40-44,M,110,187236,24,34.86999965,2,2
    1314337,1178,179904,40-44,M,111,72157,9,13.50000036,1,1
    1314338,1178,179905,40-44,M,112,91180,10,13.55999994,1,0
    1314339,1178,179906,40-44,M,113,86293,6,9.259999871,1,1
    1314341,1178,179908,45-49,M,100,101410,12,17.94000006,4,0
    1314343,1178,179910,45-49,M,102,134245,18,25.75000024,2,1
    1314345,1178,179912,45-49,M,104,125650,20,30.08000076,4,0
    1314346,1178,179913,45-49,M,105,50406,5,7.26000011,1,1
    1314348,1178,179915,45-49,M,107,121769,13,18.41999996,2,1
    1314349,1178,179916,45-49,M,108,267106,34,50.5,4,1
    1314350,1178,179917,45-49,M,109,365539,57,82.13999915,5,2
    1314351,1178,179918,45-49,M,110,188758,25,36.60000038,2,1
    1314353,1178,179920,45-49,M,112,108426,13,19.58000016,1,0
    1314354,1178,179921,45-49,M,113,138525,9,13.65000045,3,0
    1314355,1178,179922,45-49,M,114,150858,21,30.26000011,1,0
    1314357,1178,179924,30-34,F,101,524306,81,113.6800029,10,4
    1314358,1178,179925,30-34,F,102,104496,9,11.42999983,3,2
    1314359,1178,179926,30-34,F,103,452519,68,99.52000237,7,2
    1314360,1178,179927,30-34,F,104,442919,76,110.7800021,21,2
    1314361,1178,179928,30-34,F,105,596831,86,120.8799992,11,0
    1314362,1178,179929,30-34,F,106,173912,26,35.54000032,2,1
    1314363,1178,179930,30-34,F,107,780967,86,119.6400018,20,4
    1314364,1178,179931,30-34,F,108,132124,8,11.18999994,4,0
    1314365,1178,179932,30-34,F,109,623137,100,138.9200006,12,1
    1314366,1178,179933,30-34,F,110,99020,10,14.48000044,4,1
    1314367,1178,179934,30-34,F,111,665817,117,163.8000002,23,9
    1314368,1178,179935,30-34,F,112,699232,80,111.9899995,12,3
    1314371,1178,179938,35-39,F,100,72982,11,15.04999995,1,0
    1314372,1178,179939,35-39,F,101,975884,167,237.3199975,14,3
    1314373,1178,179940,35-39,F,102,245607,33,47.87999952,3,1
    1314377,1178,179944,35-39,F,106,485369,114,164.6400015,3,0
    1314378,1178,179945,35-39,F,107,866355,139,200.8299961,11,5
    1314379,1178,179946,35-39,F,108,502710,72,105.2199969,8,2
    1314380,1178,179947,35-39,F,109,475184,88,127.3200028,4,1
    1314381,1178,179948,35-39,F,110,357401,47,68.67000008,8,1
    1314382,1178,179949,35-39,F,111,99810,14,20.05000019,2,0
    1314383,1178,179950,35-39,F,112,81569,6,9.409999967,3,1
    1314384,1178,179951,35-39,F,113,441192,53,77.59999979,6,2
    1314385,1178,179952,35-39,F,114,90470,11,16.73000002,1,1
    1314386,1178,179953,40-44,F,100,834243,166,246.7499975,18,7
    1314387,1178,179954,40-44,F,101,696612,152,223.1899948,31,9
    1314388,1178,179955,40-44,F,102,329333,48,67.60999918,1,0
    1314389,1178,179956,40-44,F,103,1114711,224,319.0000019,6,0
    1314390,1178,179957,40-44,F,104,267316,58,82.92999887,3,0
    1314391,1178,179958,40-44,F,105,228629,38,57,2,0
    1314392,1178,179959,40-44,F,106,758340,159,233.110002,13,4
    1314393,1178,179960,40-44,F,107,877535,149,217.7799966,5,2
    1314394,1178,179961,40-44,F,108,1357386,223,323.0600071,10,1
    1314395,1178,179962,40-44,F,109,280240,61,87.99000168,2,2
    1314396,1178,179963,40-44,F,110,419922,75,105.4500008,3,1
    1314397,1178,179964,40-44,F,111,402975,83,120.8999977,1,0
    1314398,1178,179965,40-44,F,112,1137635,211,301.0499992,30,10
    1314400,1178,179967,40-44,F,114,250234,40,62.31999922,4,1
    1314401,1178,179968,45-49,F,100,904907,195,279.219995,11,1
    1314402,1178,179969,45-49,F,101,589270,107,158.0500023,10,4
    1314403,1178,179970,45-49,F,102,168714,24,36.01000071,2,2
    1314404,1178,179971,45-49,F,103,71982,11,16.34000051,1,0
    1314405,1178,179972,45-49,F,104,558666,110,162.6399975,14,5
    1314406,1178,179973,45-49,F,105,1118200,235,333.7499943,11,4
    1314407,1178,179974,45-49,F,106,107100,23,33.71000051,1,0
    1314408,1178,179975,45-49,F,107,877769,160,232.5900005,13,4
    1314409,1178,179976,45-49,F,108,212508,33,47.69000006,4,1
    1314410,1178,179977,45-49,F,109,1129773,252,358.189997,13,2
    1314411,1178,179978,45-49,F,110,637549,120,173.8800035,3,0
    1314412,1178,179979,45-49,F,111,151531,28,40.28999949,2,0
    1314414,1178,179981,45-49,F,113,790253,135,198.7100005,8,2
    1314415,1178,179982,45-49,F,114,513161,114,165.6099987,5,2`,
    datasetName: 'KAG_conversion_data',
    publishDate: '11/19/2023, 8:22:03 PM',
    size: 'small',
  },
  {
    id: 'i11dedyswB5bQ7RVTkD0',
    authorName: 'admin@gmail.com',
    authorUID: 'xqcO5YrSc1gb6bf9rVF41Rwz30s2',
    csvData: `Email,Address,Avatar,Avg. Session Length,Time on App,Time on Website,Length of Membership,Yearly Amount Spent
    mstephenson@fernandez.com,"835 Frank Tunnel
    Wrightmouth, MI 82180-9605",Violet,34.49726772511229,12.655651149166752,39.57766801952616,4.082620632952961,587.9510539684005
    hduke@hotmail.com,"4547 Archer Common
    Diazchester, CA 06566-8576",DarkGreen,31.926272026360156,11.109460728682564,37.268958868297744,2.66403418213262,392.2049334443264
    pallen@yahoo.com,"24645 Valerie Unions Suite 582
    Cobbborough, DC 99414-7564",Bisque,33.000914755642675,11.330278057777512,37.11059744212085,4.104543202376424,487.54750486747207
    riverarebecca@gmail.com,"1414 David Throughway
    Port Jason, OH 22070-1220",SaddleBrown,34.30555662975554,13.717513665142508,36.72128267790313,3.1201787827480914,581.8523440352178
    mstephens@davidson-herman.com,"14023 Rodriguez Passage
    Port Jacobville, PR 37242-1057",MediumAquaMarine,33.33067252364639,12.795188551078114,37.53665330059473,4.446308318351435,599.4060920457634
    alvareznancy@lucas.biz,"645 Martha Park Apt. 611
    Jeffreychester, MN 67218-7250",FloralWhite,33.87103787934198,12.026925339755058,34.47687762925054,5.493507201364199,637.102447915074
    katherine20@yahoo.com,"68388 Reyes Lights Suite 692
    Josephbury, WV 92213-0247",DarkSlateBlue,32.02159550138701,11.366348309710526,36.683776152869605,4.6850172465709115,521.5721747578274
    awatkins@yahoo.com,"Unit 6538 Box 8980
    DPO AP 09026-4941",Aqua,32.739142938380326,12.35195897300293,37.373358858547554,4.4342734348999375,549.9041461052942
    vchurch@walter-martinez.com,"860 Lee Key
    West Debra, SD 97450-0495",Salmon,33.98777289568564,13.386235275676434,37.534497341555735,3.2734335777477144,570.2004089636195
    bonnie69@lin.biz,"PSC 2734, Box 5255
    APO AA 98456-7482",Brown,31.936548618448914,11.814128294972196,37.14516822352819,3.202806071553459,427.19938489532814
    andrew06@peterson.com,"26104 Alexander Groves
    Alexandriaport, WY 28244-9149",Tomato,33.99257277495374,13.338975447662111,37.22580613162114,2.4826077705105956,492.6060127179966
    ryanwerner@freeman.biz,"Unit 2413 Box 0347
    DPO AA 07580-2652",Tomato,33.87936082480498,11.584782999535266,37.087926070983805,3.71320920294043,522.3374046069357
    knelson@gmail.com,"6705 Miller Orchard Suite 186
    Lake Shanestad, MO 75696-5051",RoyalBlue,29.532428967057946,10.961298400154098,37.42021557502538,4.046423164299585,408.64035107262754
    wrightpeter@yahoo.com,"05302 Dunlap Ferry
    New Stephaniehaven, MP 42268",Bisque,33.19033404372265,12.959226091609382,36.144666700041924,3.9185418391589986,573.4158673313865
    taylormason@gmail.com,"7773 Powell Springs Suite 190
    Samanthaland, ND 44358",DarkBlue,32.38797585315387,13.148725692056516,36.61995708279922,2.494543646659249,470.45273330095546
    jstark@anderson.com,"49558 Ramirez Road Suite 399
    Phillipstad, OH 35641-3238",Peru,30.737720372628186,12.636606052000129,36.213763093698624,3.357846842326294,461.7807421962299
    wjennings@gmail.com,"6362 Wilson Mountain
    Johnsonfurt, GA 15169",PowderBlue,32.12538689728784,11.733861690857392,34.8940927514398,3.1361327164897803,457.84769594494855
    rebecca45@hale-bauer.biz,"8982 Burton Row
    Wilsonton, PW 88606",OliveDrab,32.33889932306719,12.0131946940144,38.38513659413844,2.420806160901484,407.7045475495441
    alejandro75@hotmail.com,"64475 Andre Club Apt. 795
    Port Dannytown, PW 63227",Cyan,32.187812045932155,14.715387544156501,38.244114594343515,1.5165755808319439,452.31567548003545
    samuel46@love-west.net,"544 Alexander Heights Suite 768
    North Johnview, MT 57912",LightSeaGreen,32.61785606282345,13.989592555825254,37.190503800397956,4.064548550437977,605.061038804892
    megan33@gmail.com,"84426 Julia Vista
    North Teresa, KY 50756",PeachPuff,32.91278511115979,11.365492025516156,37.60779252420698,4.599937357614995,534.7057438060227
    agolden@yahoo.com,"PSC 2490, Box 2120
    APO AE 15445-2876",Black,33.50308725671972,12.87798369625634,37.44102133556604,1.559151939957077,419.9387748391792
    vstafford@hotmail.com,"PSC 5723, Box 8159
    APO AA 74738",Olive,31.531604482572902,13.378562784168986,38.734006289897124,2.2451477874052825,436.51560572936256
    denise22@hernandez-townsend.com,"USNS Cardenas
    FPO AA 85439-9449",Silver,32.903250973372074,11.657575922065584,36.77260376125875,3.9193023085531835,519.3409891307888
    youngbarbara@yahoo.com,"019 Elliott Tunnel Suite 190
    Nicholsbury, WV 60804-4440",Wheat,34.50755099852662,12.893669504071738,37.63575587790592,5.705153970601026,700.9170916173961
    william25@mcconnell.com,"9495 Mary Fall Apt. 777
    Glassport, ND 17957-5596",Teal,33.02933195350689,11.765812645482358,37.738524945579094,2.7217359920452187,423.17999168059777
    ijones@schaefer-carr.net,"657 Judith Crossroad
    Hancockchester, VI 75658-5788",Linen,33.54123131310037,12.78389178427502,36.430649621049305,4.648199316428601,619.8956398616368
    heatherhall@yahoo.com,"8522 Regina Port Suite 782
    Port Kaitlin, TX 50501-7264",MediumSlateBlue,32.33598963740772,13.007819424388568,37.85177916943607,2.996364526268539,486.83893476506273
    tinasmith@martinez.info,"40000 Ann Port Suite 474
    Youngberg, MS 03651",LemonChiffon,33.11020505771776,11.982044994015611,35.29308775436051,3.9234887455274374,529.537665336851
    chasejennifer@hotmail.com,"9507 Robert Prairie Apt. 601
    East Crystalview, SC 56814",DarkOrchid,33.10543794246846,11.965020002997898,37.27781174207212,4.742577519573315,554.7220838330761
    jenniferbarnett@gmail.com,"0772 Michael Isle Suite 617
    Meyerstown, WA 45449-6768",SeaGreen,33.24190043446127,12.305417813429445,36.16364817104465,3.062368145311689,497.58667130044074
    jared39@hotmail.com,"739 David Isle Suite 818
    Chandlertown, DC 34587",SteelBlue,33.46105629551836,10.869163814130363,35.62244242064545,3.471413452477678,447.6879065360586
    briancarlson@page-fleming.com,"USCGC Gill
    FPO AA 26496",DarkMagenta,32.175501237949376,13.387492105579694,35.69417498569782,4.343062915388998,588.7126055095755
    joshuaodom@gmail.com,"5277 Patel Brook
    East Audrey, NJ 19075",DarkGoldenRod,32.72836000313375,13.104507242875801,38.878040506759845,2.8200972339734696,491.07322367951974
    vickie90@lee-wilson.com,"9135 Rodriguez Dam
    Ramirezberg, MS 77223",DarkSeaGreen,32.82030994541536,11.634893252550466,35.36862632536302,4.1245852967146535,507.44183233961667
    duane56@hotmail.com,"24373 Mcgee Drive Apt. 990
    New Mariahaven, NH 14470",Gainsboro,33.61603789276768,11.936386499892283,38.768640998026676,3.649286157714702,521.8835731664784
    enash@gmail.com,"997 Campbell Flat Suite 970
    East Amanda, PW 22048",HotPink,31.721652360509037,11.75502370305383,36.765722357858394,1.8473704233395085,347.7769266318726
    sandraharrison@bailey-gordon.net,"7835 Rogers Roads
    East Amberhaven, MI 70835-2286",LightSeaGreen,32.8653271748764,11.984417523634924,37.0443614002997,3.452388582630727,490.7386321439546
    cunninghamwilliam@hotmail.com,"4589 Dan Fords
    Beasleyburgh, ME 96590-8272",HoneyDew,32.74936818112046,9.954975969174418,37.38831486719822,4.650491269094463,478.1703340540876
    teresaallen@hill-leach.info,"1958 Robert Bridge Apt. 250
    Malloryland, ID 03393-5336",WhiteSmoke,32.56723048027511,12.489013215743665,36.37147981406854,4.22243622534277,537.8461952695957
    rhonda96@little.org,"2977 Perez Row
    Lake Jack, TN 45336-9436",GhostWhite,32.07054622092545,11.733106220383402,37.53429101112127,4.671275460906252,532.7517875818365
    lisacabrera@yahoo.com,"9801 Thomas Pike Suite 058
    Brandishire, AK 88122-1314",DarkSlateBlue,33.01954798572344,10.634561317920278,37.49669014561275,4.646119976606155,501.87443028426947
    jasonrichardson@elliott.com,"18372 Matthew Fork Suite 705
    North Matthewmouth, KY 99737",Chocolate,33.79203907501622,12.507525374016035,37.14286198458455,4.214495086037866,591.1971781805905
    hoovernicole@dorsey.net,"69403 Hernandez Knolls
    Marciashire, DE 36417-5667",HoneyDew,32.89398062181101,11.52987820576495,36.888086054199256,4.643258549800133,547.2443434159983
    christopher20@gmail.com,"USNV Fuller
    FPO AE 32122-5711",Snow,32.04448612744043,13.41493473585169,36.11243501077792,2.258686386946843,448.22982918655
    brianwilson@yahoo.com,"448 Stewart Divide
    New Ashleyfort, FM 84050",BurlyWood,34.555767994657494,12.170525424959397,39.13109673366661,3.663105491283854,549.860590464497
    gonzaleskatie@gmail.com,"70129 Darrell Spring
    Thomasmouth, HI 39319-2739",Moccasin,34.56455770619167,13.14655143290706,37.335445894325716,3.8768751769237673,593.915002968289
    lsmith@chung.com,"412 Jackson River
    Kleinburgh, KS 52039-7404",BlueViolet,32.726784597863976,12.988510147185293,36.46200325853961,4.113226122724209,563.6728733601082
    dongarcia@hotmail.com,"546 Benjamin Lights Suite 421
    Romerofurt, NC 43746-4501",MediumBlue,33.117218732994786,11.86412635894251,36.582727765406275,3.202531199210734,479.73194908594513
    kimberly46@garcia-nelson.biz,"4066 Gonzalez Dam Apt. 277
    West Jessica, TN 36880",GreenYellow,31.661049822746076,11.398064190096813,36.59445670006827,3.198399271684906,416.35835357990084
    william82@gmail.com,"11143 Park Squares
    Samanthatown, UT 97073",SandyBrown,33.25633546983111,13.85806246213124,37.78026468722867,5.97676812602,725.5848140556805
    brenda82@maldonado-gonzalez.net,"645 Elizabeth Pass
    Williamview, MS 51544",MediumVioletRed,33.90022441401576,10.956790967791651,37.266878259420906,2.9526689579217362,442.66725173862795
    josephgould@west.info,"861 Annette Stream Suite 771
    North Miguel, CA 33824-1610",DarkBlue,34.18777482695728,10.320116255059192,37.45340510152358,2.0948917061051766,384.6265715694054
    wbrady@yahoo.com,"044 Riggs Expressway
    Lake Stevenchester, AL 22283",SandyBrown,33.76206923913139,9.98451439654646,35.93344930095986,3.85547168456418,451.4574468676027
    smithtracey@mcgee.com,"PSC 4508, Box 7961
    APO AA 55271-2375",DarkOliveGreen,34.390163664343326,12.64519514084352,38.46832110587932,2.8745969103039517,522.40414125956
    amberchase@fowler.info,"1867 Gregory Isle Suite 022
    Port Tammy, LA 52305-9696",GreenYellow,33.92529660119954,11.588655423353044,35.25224202243303,3.3920504890738385,483.6733080190456
    gregoryholmes@hotmail.com,"2891 Martin Plain Suite 197
    Melaniestad, NE 65650-8529",DarkSalmon,32.68822929602445,13.761532847115612,39.25293095040623,2.995761182613056,520.8987944502368
    jeffreydawson@gmail.com,"9944 Trevor Expressway
    Robinsonstad, OR 34630-1840",DarkSeaGreen,34.3018702154015,10.568294685632761,36.17312563197192,3.315224753915403,453.16950235469744
    rjohns@gmail.com,"264 Derek Dam Apt. 680
    West Danielle, SD 91517-8611",DeepPink,32.843930222655175,11.832286222863628,36.81401056250368,3.4719191365417483,496.650708068581
    john85@martin-morgan.com,"USNV Reese
    FPO AA 73568-0730",Olive,33.75499472831927,12.06415663219932,37.271221692501925,3.9705556280753487,547.3651405940458
    vcoleman@yahoo.com,"7761 Hughes Curve Apt. 880
    Rodriguezberg, MN 96206-5317",SkyBlue,33.879784289702826,12.495591602384836,38.052609752573076,4.639320331857264,616.8515229667128
    floresarthur@yahoo.com,"12612 Johnson Skyway Suite 764
    Jessicaville, CT 14968-6590",Magenta,33.07653560709715,9.607314687519166,36.49399254673739,5.081210092491108,507.21256900067846
    ryan36@gmail.com,"5379 Rhonda Prairie Apt. 696
    Brownland, WA 87027",DarkTurquoise,32.22729913636721,13.728627177429864,37.99702800956553,4.8026306305233755,613.5993233689068
    chris67@ryan.biz,"716 Bush Greens Apt. 098
    Trevorton, MA 17817-8000",Silver,32.789772618310714,11.670065919118978,37.4087484767376,3.4146884225048972,483.15972078451705
    katie25@gmail.com,"6861 Lopez Fork Apt. 114
    South Jamiechester, DE 63993",SpringGreen,32.77260992960089,13.276313008175375,36.60077705432864,3.4622988474603718,540.2634004105403
    kyang@diaz.org,"223 Love Trail Suite 831
    Port Jeffrey, IN 46849",OliveDrab,34.374258045247466,15.126994288792467,37.15762409406526,5.377593583586978,765.5184619388372
    tadams@contreras.info,"049 Matthew Terrace
    Lake Matthew, MS 20210",Aqua,33.0787172146689,12.695789749023145,35.358444307206696,4.001786345798084,553.6015346844503
    craigcastro@burgess.com,"65407 Warner Forges Suite 071
    New Lori, AZ 30132-2395",OrangeRed,32.80522040097184,11.835476087614284,36.375066106372905,3.4395905595500764,469.31086149531063
    ellen24@anthony.com,"PSC 3408, Box 3353
    APO AE 05113-1257",LimeGreen,32.43075793005128,11.306232344673575,37.68040322813719,2.7795207192736093,408.62018782983785
    davisrobert@hicks-smith.com,"95967 Pitts Burgs
    West Sarah, MH 27817-5147",SkyBlue,32.179099972602344,11.187538910878676,40.005181638101895,3.5526497674265176,451.575685159493
    walkerlaura@peterson-yates.com,"89154 Jones Stream Suite 311
    East Katie, NC 72742-1516",LightGreen,33.15417578832186,11.887494133971662,36.265000697022046,2.6022871120328714,444.96655165329264
    marc54@hotmail.com,"Unit 6174 Box 1949
    DPO AP 27478",SandyBrown,34.33589583979252,12.2289347111239,36.1571911511149,4.694322274442824,595.8228366992037
    gregoryrussell@yahoo.com,"55436 Devon Plain
    West Kendraberg, HI 18826-3623",Teal,32.38625185558597,10.674653472691903,38.006583179477666,3.4015223445155094,418.1500810968496
    williamsjohnny@ferguson.info,"51920 Kent Junctions Apt. 352
    Walkerport, NY 11257-6647",LightYellow,32.80869759268502,12.817113090284248,37.031539216766284,3.8515788003584657,534.7771880994133
    haydenrebecca@gmail.com,"10022 Wilson Orchard Suite 107
    Harrisstad, MH 99272",MintCream,33.87974496798125,13.5878060830337,38.260353442660126,3.25811288288828,578.2416050583773
    langmatthew@hotmail.com,"606 Perez Drives
    Maryside, CO 94387-5877",DimGray,32.04983939045731,12.238057349986248,38.73086173541955,3.120568914816974,478.7193568742153
    david43@richards.com,"967 Andrew Spurs
    Mathistown, CO 28230",Indigo,33.55520742143224,11.55182116621942,36.628834292811774,2.837943164069798,444.28590749764356
    paulkemp@yahoo.com,"PSC 9698, Box 5466
    APO AE 75496-3580",LightSalmon,33.14207932732039,11.433379933334457,35.89243163440533,4.470282584120023,544.7798637193825
    fbryant@gmail.com,"284 Jennifer Curve
    Lake Hollyberg, IN 05228",GreenYellow,32.59718265981362,10.889566863427978,38.21257083414733,4.442054329011166,488.7860610939056
    kimberlyfrederick@gmail.com,"71299 Jessica Shoals
    East Mark, IA 48085-1070",DeepSkyBlue,33.167136876950536,11.928842093866267,36.91463331144087,3.164943995285113,475.75906778832797
    sharon82@saunders.info,"873 Clay Flats Apt. 810
    Lake Kyle, GU 48782",DarkGreen,31.514737857801983,12.595671305072534,39.600376465861395,3.7517345520890513,489.8124879964614
    fishermichael@ramos.com,"565 Duarte Keys Suite 293
    Traceytown, IN 17797",LimeGreen,34.59402114954151,10.947258584185185,35.88399438701215,3.1597544439509266,462.8976361529081
    ilawson@hotmail.com,"19018 Christopher Neck Apt. 963
    Mcintoshchester, IA 66908-2456",DarkGoldenRod,33.50136982210362,13.898081993497069,37.0589128165069,4.130562809236323,596.4301726172283
    shafferdaniel@murphy-harris.info,"USCGC Thomas
    FPO AP 43708-2468",Turquoise,32.40237101796123,10.875559548189255,37.78114255999947,1.9140899242310996,338.31986264152215
    stevenanderson@yahoo.com,"5401 Holt Corner Apt. 195
    Hannahstad, NC 86693-3595",LightGreen,34.65548567957987,10.33807269503854,36.15725594420065,4.396651901097083,533.5149352552407
    richard16@boyer-pratt.com,"4568 Jeffrey Lane Apt. 512
    South Jason, WV 78116-0966",LightSteelBlue,31.809300316679188,11.634668217942473,36.182539282355286,5.113319474870622,536.7718993628412
    hyoung@jones.info,"73469 Baker Forest Apt. 550
    Allenbury, TX 63791",Cornsilk,33.877779300122526,12.517666287393077,37.151920660971435,2.6699416242795815,487.3793060170291
    erik46@hotmail.com,"20711 Martin Harbors Apt. 582
    New Justinborough, AK 40834-2664",LemonChiffon,34.447871436480774,10.607723870859086,36.81909551318471,3.3664637433729325,473.7289665129948
    rojasmichael@wagner-thomas.com,"7602 Scott Plaza Apt. 158
    Lake Amberland, VI 10516-3276",DarkKhaki,31.956300560523367,12.828893395018701,36.951616684246815,4.571213023779052,547.1259317471988
    lance88@briggs.com,"16001 Wilkins Island Suite 852
    Jonathanfort, AL 88541-7817",FireBrick,32.6055836415705,12.068816079691766,36.1050004999139,3.917451119136939,505.1133435398579
    anthony09@hotmail.com,"5118 Madden Views Apt. 738
    North Barryport, AS 28731-2270",LightSeaGreen,32.49144660312287,12.530357373542882,37.87521910003027,2.476139050596411,449.0703194428044
    audreyjohnson@rosales.com,"USCGC Nicholson
    FPO AE 43987-0470",SlateGray,33.616018552595435,13.516284296962846,36.77312349371806,4.125584363255396,611.0000251040717
    beth76@yahoo.com,"4522 Paul Heights Suite 851
    Adamsland, RI 08981",Crimson,33.47160052695171,11.662263431208277,36.05024078202619,3.9972553776226674,515.8288148548279
    larrywest@davis.com,"21918 Gail Glens
    Barbershire, SD 45790-8387",MidnightBlue,33.71065305912268,13.664747875183542,37.72438615760942,1.3626740800013843,439.074766741645
    raylopez@hotmail.com,"3600 Amber Plains Suite 002
    North Jamesburgh, VA 07917",DarkGoldenRod,32.19772379742183,11.83023109487895,36.63385670229112,4.193324635532072,514.088957746572
    middletonrenee@gmail.com,"71757 David Freeway Apt. 851
    West Carriefurt, NC 27106-3364",DarkCyan,32.46121244511541,13.291143045352882,38.633625651583536,3.8710034001764155,543.340166256701
    grichardson@ryan.info,"79139 Boone Common
    Stewartstad, DE 63633-1812",SteelBlue,33.790387206952126,11.942340869536073,38.06341358683894,4.08180269478151,521.1429518103512
    esmith@gmail.com,"USS Johnson
    FPO AE 35617-5384",OldLace,34.18382052058911,13.349912944366531,37.827394227862136,4.252006105620936,614.7153338263417
    michael53@munoz.com,"USNS Mitchell
    FPO AP 92946",MediumBlue,32.288666909138946,12.020112091208748,39.074400211336965,3.911708668370663,507.39006178986654
    jacqueline46@mcdonald-smith.biz,"3794 Michael Forest Apt. 750
    New Stephenberg, MD 61004-0181",Gray,33.82635200907213,12.084091730811034,35.89035795567322,3.021671821710012,495.2994425473086
    briannasantana@gmail.com,"88978 Noble Crest
    North Rosemouth, FM 53484-6689",LightPink,32.49839307472945,13.410759184940549,35.9904889547585,3.184618661620886,518.0645579840107
    mark52@yahoo.com,"82227 Farmer Throughway Suite 266
    Leeborough, WV 35324",BlanchedAlmond,31.88540629991176,11.281931074103642,37.385317552778375,2.877224878259828,390.1032729724755
    acampbell@sanchez-velasquez.info,"5791 Jessica Cove
    Mckinneyborough, OK 64460-7536",Wheat,32.425697279750864,11.448901535513796,37.58019042917731,2.5869679851624765,420.7376732446371
    qgarcia@williams.com,"465 Kenneth Common Apt. 192
    North Tracy, WI 36024-8978",Aqua,33.43782956230187,12.595420346380532,36.26203180012439,2.9696402266327593,492.1050523891852
    jenniferking@hess.net,"06939 Jones Neck
    Mariaview, VT 87641",BlueViolet,31.3895854806644,10.994223919350974,38.07445241970454,3.4288599039280125,410.06961105998295
    taylor91@hotmail.com,"3132 Willie Harbor
    Kaylafurt, FL 01107",CadetBlue,33.46869994900622,13.085505760060858,35.84582711383271,2.926940235492512,497.5136833293677
    afry@ford.biz,"399 Jeremy Skyway Suite 377
    North Keithville, IL 55074",PaleTurquoise,32.291756100263015,12.190474287309026,36.15246208860067,3.7818230393432954,494.55186108657256
    amandadean@gmail.com,"66880 Mckinney Hills
    Matthewchester, MH 88386",DimGray,32.0637746203137,10.719149740628396,37.71250863884946,3.004742535925674,378.3309069068038
    brenda68@hotmail.com,"0377 Reed Via Apt. 169
    Alexandershire, MO 43498",Moccasin,33.15569970295208,12.931550271647987,38.16643555663392,3.854473855602962,570.451725912857
    bakerdrew@gmail.com,"39637 Griffin Plain Suite 691
    New Deborahview, MP 73870-3773",Chartreuse,33.35687434475742,13.45212895943564,38.503008849241596,3.318822278930894,549.0082269346927
    connorlambert@yahoo.com,"931 Andrews Heights
    South Shelley, NV 21850",Khaki,31.85307480174657,12.149375491578276,37.32533422381935,3.3618146243831437,459.285123462352
    tknapp@yahoo.com,"15810 Karl Plain
    Davidville, TX 64072",MediumSpringGreen,32.01230076824544,12.178331333996287,37.71598617762173,3.722561172893833,492.94505306595823
    garcialisa@yahoo.com,"46079 Gonzalez Loaf
    Williamside, PA 72265",LemonChiffon,32.388451625505326,11.010482132400076,38.415041581538325,3.5435470501829984,424.7626355099111
    josephallen@hotmail.com,"3144 Jamie Rest
    Maxwellville, NC 93749-1190",PeachPuff,32.65318145878372,11.60253219348616,37.3096887708795,2.789461516374708,422.42677587650905
    hailey18@yahoo.com,"08079 Thompson Village
    North Lukeborough, AL 16825",Lime,32.93133644189654,12.732211588456625,35.60082054911087,5.4859767341605234,642.1015787311585
    whess@hotmail.com,"29282 Alexander Street
    South Andrewmouth, MS 22041",Tomato,33.235606500693855,11.223368888365105,37.69230086128235,2.5941897205777797,413.3717831104521
    josesims@hunter.com,"8830 Debra Loaf Apt. 341
    Drakeville, ME 22340",SlateBlue,33.92579489547876,12.01102187657459,36.701052315547926,2.753424168758119,479.23109291159307
    dtaylor@webb.com,"18219 Jackson Well
    Fosterton, MP 85302",Orange,33.05926409135838,11.725910097840954,35.9990993016087,5.004820577490747,593.0772413447512
    briangonzales@gmail.com,"572 Michelle Motorway Apt. 889
    New Craig, ND 17250",Fuchsia,32.401731827354666,12.089309572437347,38.309907895123196,3.873337568743252,506.5473070543516
    jared99@yahoo.com,"PSC 0811, Box 7054
    APO AA 91691",GoldenRod,33.88994100692418,13.068638584182434,37.54052035512257,3.7987253190525396,571.3074948754644
    qchristian@martinez-allen.com,"26737 Brooks Roads
    Vincentstad, VA 93089",GreenYellow,34.56938121869345,12.85499036656409,35.00748225744693,3.292797662575647,576.311177371677
    ngarcia@donaldson.info,"662 Wells Stravenue Apt. 578
    South Kristaview, DC 49423-2452",ForestGreen,33.70160519868888,11.564022368065539,37.673210365648636,4.716104987209577,576.8025473995871
    scastillo@hotmail.com,"0922 Gutierrez Loaf
    Wattsbury, OH 96315",Moccasin,33.26833021768797,11.113329897404322,37.387945542635585,4.018726609737513,514.239520718957
    joshua56@garcia.com,"38154 Davis Locks
    Lake Stevenfort, KY 86814-9222",Indigo,31.358477192437007,12.809883473378118,36.5496679900966,3.6377012795158374,495.17595044947535
    richard81@day.org,"7955 Samantha Walk Suite 230
    North Luis, IL 44629",SlateBlue,33.01479221522831,11.76117232548311,37.57016384471318,3.834169666632599,514.3365582674007
    jessica97@hotmail.com,"32202 Curtis Branch Apt. 411
    Port Brettmouth, KY 01192-0594",Cyan,31.57613197132227,12.57989417361806,37.09326487011031,4.5319866066666314,541.2265839893283
    angelaphillips@gmail.com,"102 Karen Court
    New Jameston, SC 57761-6570",MintCream,32.657268594778124,11.957923064554107,36.63465232853774,4.106055151602658,516.8315566841785
    donald67@harrison.com,"9759 Tammy Skyway Apt. 171
    Lake Debra, AS 95011",Lime,34.709323296131586,10.651793783474174,37.14600652898046,3.2182653850978555,468.4457372274064
    zmalone@yahoo.com,"PSC 6717, Box 7673
    APO AE 66950-0088",Moccasin,34.5366591798774,12.75207661096469,36.71413783923341,3.2836634554040156,548.2803201983364
    rlindsey@norris.com,"581 Smith Prairie Suite 995
    Andersontown, AS 58802",Green,32.771715009701,11.540832436151055,37.526421027792445,2.924020724598205,431.6177337614297
    lewisgabrielle@hotmail.com,"422 Rivers Springs Suite 221
    North Barbara, WI 51990-7596",LightSkyBlue,33.700400456822415,11.924394923280017,37.245032469967526,3.9052503089821307,552.9403454501057
    kristina69@gmail.com,"2859 Rodriguez Forks
    Port Josephtown, OH 13591-3011",BlueViolet,32.43977025334846,12.4241304114395,38.94882502753235,4.9203184061183185,573.3062222574563
    krista86@norton.net,"0537 Rice Village
    West Kylieberg, NJ 19433-5090",Azure,34.312166997407836,11.810586764578167,37.41413357473937,2.473596120847858,452.627254995083
    chelsea05@hansen.com,"7182 Stephen Fork Suite 150
    Port Laurachester, CO 99974-1961",LightGray,32.45517628513712,12.759168978762087,36.599112354294384,4.131276648377655,542.7115581025776
    jill33@allen.com,"459 Amy Burg
    Lake Travis, OR 53314",DarkCyan,33.540976791782235,11.851890834942719,37.424547922263905,1.7677307075942403,407.8040306356823
    welchashlee@hotmail.com,"PSC 8159, Box 3254
    APO AP 71071-4890",GreenYellow,33.358398281424215,12.70368792886871,36.10091445210865,2.72410820200549,482.3535703213531
    dawnlewis@watkins.org,"623 Erica Flat
    Lake Josephland, MT 73514",Crimson,32.686129256115166,12.215252424902488,36.59436168489157,3.8971158599572524,529.2300901235094
    ashleychristopher@gmail.com,"9271 Christopher Prairie
    Douglasshire, NM 18581",MediumOrchid,34.558294609144475,11.28144500356714,36.4944064828881,2.491671541288354,433.04876909582663
    acontreras@hotmail.com,"88995 Edwards Row Suite 456
    North Jo, DE 02062-7953",Sienna,33.5477479443078,10.735362917985055,37.45837473122323,3.8634254422050347,476.1914133494556
    alvaradoadam@jones-thompson.com,"35970 Holly Key
    Port Frank, VT 78059-9385",Aquamarine,31.954903856634843,10.963131776054833,37.327282689879496,3.5786339003939873,439.997879939927
    thomasgeorge@gonzalez-grant.com,"93306 Donald Greens
    New Christopherbury, SC 59447",FloralWhite,31.066218161637593,11.735094549013704,36.59937399114725,3.9588922643660966,448.9332932076743
    solischristina@gmail.com,"43102 Russo View Suite 717
    Hollyport, SC 15344",SlateBlue,31.851253128608366,12.418961981005012,35.97765170714366,3.2517417703068876,472.99224666679834
    jacksonboone@rubio.com,"973 Marc Ports
    Brownstad, IN 48786-6700",Sienna,32.609282635640405,10.537307537840885,35.73055240228659,3.914384667246393,463.92351299032583
    kaitlyn78@chang.com,"978 Bean Square
    Deanburgh, OR 95149",LimeGreen,32.11511906601424,11.919242397939174,39.29404346247573,1.4435150746515455,350.0582001638451
    francisgeorge@thomas.org,"27563 Vincent Lake
    Allenchester, DC 22159",Teal,33.924624809512075,11.911415556879854,38.27470219571763,2.9100379165410692,460.0612773912433
    linda90@yoder.org,"979 Alison Motorway Apt. 676
    North Frank, HI 55870-2651",WhiteSmoke,33.477190403003306,12.48806700205303,36.51838358912681,3.3455709758422434,505.7711403229565
    david79@lopez-montes.com,"969 William Manor
    West Sherry, MA 66282-2258",Purple,32.116400120928155,12.380694979552985,37.23200330765404,3.0895277822700096,463.484995404266
    micheleblanchard@lopez-greene.com,"555 Hunt Track Suite 307
    South Kristi, PA 73709",SlateGray,32.25590120444978,10.480506832694495,37.33866962178549,4.514122441132637,479.73193764530447
    pmercado@rodriguez.com,"811 Maria Run
    Sanchezville, MI 04953",LightPink,32.69239221858063,12.296517680733736,36.95155521050133,1.8258846690261428,424.18549428888633
    james30@carter.biz,"3604 Richard Junctions Suite 448
    Brownburgh, CO 64856-8238",LimeGreen,32.38473265900513,10.86160419912899,36.584437621758106,3.993656512525085,465.8893127108669
    parkerkayla@miles.com,"170 Andrew Mews
    North Susan, NM 85338-2426",DarkSlateBlue,34.338729385091796,10.716355140061571,38.3072040068692,2.652158304851241,426.7752159856604
    alicia85@lee.com,"14220 Carla Flat Suite 521
    Lake Matthew, DE 06183",DimGray,32.88710464561531,12.387184173554845,37.431159098326106,6.401228837806773,684.1634310159513
    dominguezjacob@hotmail.com,"8594 Erica Manors Apt. 529
    Lake Miguel, MH 10652-9266",CornflowerBlue,32.51021799444433,10.984835888186163,37.396497475332055,5.391275125020632,555.8925953881737
    ebrown@osborne.com,"4291 Nichols Fork Apt. 562
    Thomaschester, SC 08938-8769",DarkSlateGray,31.945395748344524,12.965761479512217,36.96638889642577,6.076653638440144,657.019923937652
    nathan86@hotmail.com,"748 Michael Plaza
    West Billyside, UT 20799",MidnightBlue,36.13966248879052,12.050267234380506,36.95964319393419,3.8648607392342784,595.8038188761142
    aaron11@luna.com,"672 Jesus Roads Apt. 443
    Thompsonland, WY 69228",LightSkyBlue,32.44952156114242,13.45772494051235,37.23880567308968,2.941410754428091,503.9783790525795
    fsnow@ellis.com,"0272 Jones Way
    Lake Angela, MP 97003-5793",MediumBlue,32.29464154956504,12.44304789043987,37.327848037843715,5.084861308602489,586.1558701804728
    asilva@yahoo.com,"USNV Johnson
    FPO AP 19026",Wheat,34.60331111938746,12.207298491050794,33.91384724758464,6.922689335035807,744.2218671047146
    casey21@johnson.com,"691 Johnson Field Apt. 510
    Michaelville, VI 78140",SpringGreen,33.5985203185533,11.586319529181234,39.09462702670515,3.6043985602569495,512.8253581285203
    campbellross@yahoo.com,"6218 Michael Station Apt. 982
    Salazarburgh, NJ 79955",DarkRed,34.56868084571511,11.378087087773375,38.304471191707776,3.7849321101304056,528.2238093680072
    blevinseric@stephens.com,"PSC 3676, Box 1549
    APO AE 26130-7683",Orange,32.83810016055479,12.364341604455198,38.03910938707497,3.3091823280429793,468.9135013219844
    stevenking@patterson.com,"94730 Martin Mount
    New Matthew, VI 08142-6708",LightGray,33.50370517913956,12.399436075147092,35.01280603355904,0.9686221157417689,357.59143941508603
    samuel94@hotmail.com,"5480 Vazquez Crossing Suite 825
    East Christopherland, PA 42104",DarkViolet,33.30188161463884,12.542481050786341,38.31136489758187,3.768561962709896,536.4231045259343
    johnsonpaul@keller-woodard.org,"USCGC Dodson
    FPO AA 87781-3935",LimeGreen,30.879484344127498,13.280432242922112,36.93615937845674,3.585160635161344,490.2065999848546
    twilliams@gibbs.net,"Unit 6678 Box 6628
    DPO AP 44369",CadetBlue,33.15425475700075,11.795886676889108,37.65861690944284,4.520353377496559,550.0475805761635
    teresapacheco@salinas.biz,"75805 Larry Mills
    East Cristian, MH 53820",DarkMagenta,32.04780097886789,12.718039174525655,37.66110668399285,3.6758488000184415,513.4505711860965
    allison80@carson-hansen.com,"04311 Oconnor Park Apt. 415
    Kelleystad, ND 63064-8935",ForestGreen,33.63080076787103,12.039647840787236,38.9240870506292,2.873007508505152,497.81193000552054
    turnerryan@hotmail.com,"770 Lewis Pike Apt. 869
    Phelpsport, PA 93969-4887",LightSkyBlue,34.04663802802127,12.474455453922836,35.037856159447585,4.055775961742958,578.9862585804898
    walkererica@scott.com,"86536 Barnes Track
    South Kyle, MT 21570-5606",MediumAquaMarine,33.644177000440536,13.160020040286033,36.4077474507818,3.0151752987437077,506.5363931400864
    mark94@yahoo.com,"586 Timothy Union Suite 592
    East Joseph, MO 81374",Salmon,32.65462160732388,11.052323653306688,37.633009416643624,4.717102512825834,501.74923330839226
    daniellecuevas@hotmail.com,"9287 Daniel Rest Apt. 608
    Allentown, SD 73050",LavenderBlush,33.42874704259606,10.636761083696548,37.57883524203316,2.9263964487266874,421.96679418586734
    gbarnes@gmail.com,"8667 Suzanne Motorway Suite 241
    Spencechester, KY 74385-4618",Green,31.86483254809873,13.44340598514625,36.87831536782346,2.361086946869883,439.8912804768136
    cody68@hotmail.com,"374 Dana Junctions
    Langside, WI 36474",SpringGreen,34.48238804881123,13.28303286832567,35.90729842685246,4.968742673728142,666.125591725772
    fischermonica@gmail.com,"9847 Michael Plaza Suite 837
    Lake Christophershire, NV 87324-8427",Navy,32.529768731474434,11.747731701242175,36.93988205032054,0.8015157200042076,298.76200786180766
    brenda25@gmail.com,"353 Jones Loaf Apt. 767
    South Michaelburgh, PR 16281-4840",OliveDrab,33.432231396262715,10.859608533152711,38.83567008085342,3.6692256113154436,465.1766233052969
    david58@yahoo.com,"6058 Thomas Divide
    Matthewland, PA 89442-8198",LightSalmon,33.30857161628053,11.691686125826353,37.480911976267066,1.7157771665531147,373.8857236969501
    clifford76@johnson.com,"8032 Hodge Circle Apt. 255
    Lake Jessicashire, OR 54914",RosyBrown,32.33263706834172,11.548761439776756,38.57651554990162,4.773503047345896,532.7174856761748
    jacquelinehughes@bennett-branch.info,"601 Ashley Loop Suite 162
    Port Benjaminview, DE 02456",DeepPink,34.71345123397026,11.72400223179126,36.81385766052378,4.0878372729217025,554.9007830202702
    victoria53@hotmail.com,"16329 Sara Neck Apt. 463
    Bryanside, TX 62329",Pink,32.635877998189926,12.178573080885846,35.6742560274292,4.131755039569861,537.7731625414566
    cunninghamkyle@ellis-parker.org,"449 Williamson Lakes Apt. 118
    Travisville, AK 06848-0177",LightGreen,33.07570303157222,12.319845062066673,37.81915511227683,3.4427992020016864,501.100245232053
    jjones@yahoo.com,"047 Carla Locks
    Coreymouth, AR 98066",GreenYellow,32.23014911593311,11.084360836740512,37.9596843202141,4.724027439824315,517.1651355939779
    michaelferguson@torres-miles.net,"757 Amber Gateway Apt. 787
    New Stephaniechester, OR 61576-6056",Sienna,34.142863372870714,13.177774533773801,38.856041708111945,3.2309738432875563,557.5292736134538
    crawforderik@price.org,"5183 Michael Ramp
    East Lukeburgh, FL 93972",DarkKhaki,32.4971984614607,12.832802836968115,37.67924462448078,2.972271382079821,493.719192978176
    jlawson@mccarthy.com,"0127 Morgan Fields Apt. 080
    Thompsonfurt, ME 01160-7043",LightGray,33.12239998431699,11.509047996817198,37.25305774145061,3.182329731786818,452.12262508578493
    marshchristopher@zimmerman-villegas.com,"667 Stephanie Lake Apt. 658
    Marthashire, NC 11815-2307",DarkRed,33.088529366211525,11.85766344472502,36.0869343253416,4.806349618785283,577.2734549822936
    oolson@collins.com,"07867 Horn Lake
    West Teresatown, VT 64387-1228",Aqua,32.53379686092211,12.293365838346629,37.06462119956545,3.6203649883552003,485.92313052485173
    isaiahcampbell@yahoo.com,"55414 Ramirez Union Apt. 614
    West Crystal, CA 03845-2631",Red,32.48426048276214,10.93325227854703,36.54550622682937,3.2613247447870934,425.7450920310528
    kcannon@alvarez-cline.info,"55479 Peters Field Apt. 702
    North Micheleberg, PR 45063",Lavender,32.5434591695977,13.332839284456396,37.964390331775896,3.597459968849926,537.2150526997326
    nielsencarmen@harrell.net,"2491 Yates Crest Suite 316
    Connieville, FL 92080-0819",DeepPink,32.28312306113335,10.902556227019769,36.094241952849465,4.789201624179895,524.6379646141049
    efreeman@moore.com,"223 Powell Ridges
    East Richardtown, RI 90715-2178",White,32.200798643965314,12.276981712741968,38.23260622710401,3.3164647447029107,478.8853913201482
    roblessarah@hotmail.com,"022 Taylor Mews Suite 692
    Hallberg, NJ 53614",MediumSeaGreen,34.71331650656199,12.038808239866547,37.63529940965426,4.632460945972205,612.3852298963607
    christopherhaas@gmail.com,"56674 Melanie Flats
    Schneiderberg, IN 66532",MediumPurple,32.71251232693568,11.724473856834608,37.15315160406014,3.308443000674604,476.7667241547634
    ethomas@yahoo.com,"1279 Douglas Mountains
    Port Christopherberg, RI 32811-8325",LightGreen,33.69489765096749,11.202669899735568,35.49396408005127,4.015986640445781,505.1196375282037
    wevans@gmail.com,"222 Jason Park
    Dominguezshire, NC 98241",Tan,31.57020082932026,13.378063328893631,36.33780003116479,4.369366793790984,545.9454921414049
    patrickorr@yahoo.com,"6009 Heather Park
    Howardhaven, SD 51705-2993",LawnGreen,33.45947684896434,11.388612618641039,37.90913871755985,2.56663984381683,434.0216997527185
    mary84@edwards.com,"19123 Craig Isle Apt. 719
    Millsmouth, SC 94194",LightSkyBlue,31.820998201672072,10.771074062599588,37.278639793707605,3.5190324339539223,424.6752810132133
    longwilliam@gmail.com,"16068 Kelly Parks
    Wrightside, NH 21447",BurlyWood,32.73322416398153,11.818571762285,37.1020313268591,1.5038544212252947,352.5501081630003
    lisagutierrez@johnson-herring.net,"89300 Amber Centers Apt. 879
    Victoriaton, VT 98394",Peru,32.40714829999668,13.808798675105962,37.42676891745393,5.039955263662929,662.9610878058954
    david81@hotmail.com,"1576 Lane Shoal
    Rogerton, PR 63867-3426",Thistle,33.506092281309364,11.659832840871445,37.28139282998597,4.4787126084630104,560.5601606242603
    jacksonking@mccormick.com,"120 Micheal Fort Apt. 762
    East Patrickbury, WY 65946",DarkMagenta,30.836432674773427,13.100109538542808,35.90772142967966,3.3616129845381932,467.5019004269896
    jessica04@christian-riley.com,"338 Graham Loaf Suite 236
    East Toddton, FM 43566-4238",LemonChiffon,34.87849495417028,13.067895684999526,36.67822227440393,1.9207154781756468,504.8704323933724
    simmonsmartin@hardy.com,"2302 Joshua Park
    Millerbury, WA 30239-8144",MediumVioletRed,34.007211972221654,12.49432293326939,36.045459420486154,4.330714461860564,590.56271964715
    michellejohnson@sanders-rodriguez.com,"70562 Gonzalez Stravenue
    Elizabethland, WI 40700-9149",Teal,31.525752416968214,11.340035931978809,37.03951365322458,3.8112481708072314,443.9656268098819
    tylerhernandez@barton.info,"7613 Miguel Knoll Suite 762
    West Katherine, WV 19406",SlateGray,31.047222139487516,11.199660962300452,38.68870909942437,3.0887639575315755,392.4973991890214
    connerjoseph@gmail.com,"981 David Square
    New Jacquelinetown, AK 66018-4092",Turquoise,34.59577669439264,11.332487778094174,35.45986279714474,4.541695256706066,568.7175759305223
    jeffrey54@mcdonald-williams.com,"297 Francis Valley
    South Lindsey, NY 13669-5367",Gainsboro,34.96760988717724,13.919494396088172,37.952013186883086,5.066696864020983,712.3963268096636
    hevans@kelly-nunez.org,"Unit 4065 Box 2267
    DPO AE 69180-7372",Orchid,32.29524762622046,11.03135834040919,38.252978273334655,3.1074686827074625,413.29599918102974
    lewiskendra@yahoo.com,"988 Matthew Plaza
    Lake Jacobshire, AL 37889",Yellow,33.324240521849696,11.084584086421872,36.77601657686874,4.74698970293514,562.0820453929382
    freemantina@cannon.org,"870 Dennis Throughway
    Wilsonport, PW 12658",AntiqueWhite,32.903454333014224,10.54264542398311,35.53386350026307,3.0918268695457876,412.012931298847
    wagnerbrian@hotmail.com,"50593 Wells Roads Apt. 110
    South Amy, MI 06969-2026",AliceBlue,32.55949313011333,11.797795514880239,37.777365796776465,3.1956257763719886,468.6684655991273
    melissa08@nelson.com,"15863 Harrington Glens Suite 012
    Marystad, LA 50652-8210",Tomato,31.765618821042406,12.442616548294634,38.13171202563648,3.8502796390964265,496.55408163560713
    karina59@gmail.com,"9580 Clark Trail Suite 687
    Williamsside, FM 57367",PapayaWhip,34.08164619679617,12.104542428062686,36.05964597986499,3.974522480483529,548.5185292758069
    baldwinbryan@estrada-silva.biz,"1470 Kathleen Pass
    South Christopherberg, SD 22850",MediumSeaGreen,33.304431285296005,12.378490222808672,38.76429717446252,3.8438489214952876,536.1308968550214
    audreyguerrero@carey.com,"1995 Susan Locks Suite 760
    East Cheryl, AR 37103-5176",BlueViolet,34.33075044367848,13.722453676229962,35.773116391246816,2.909008460485079,558.4272571753238
    drew29@hotmail.com,"20888 Erin Via
    Grahamville, NH 72913-6101",Tomato,32.07894757956938,12.725909323593955,36.54466409871873,1.1390935384245742,357.8637186383917
    michael00@yahoo.com,"03065 Henry Courts Suite 443
    Derekstad, VT 88473",DarkSlateGray,33.60579899891236,13.68511889962359,34.89198326749108,2.6852848361090778,529.0566631985306
    jgray@khan-allen.com,"1416 Rachel Crescent
    West Laurieside, IL 81119-7229",Gold,32.74515048083576,10.012583366223023,38.35495987026449,3.108911449181274,387.35707273642186
    bushsusan@hotmail.com,"20618 David Square
    Gayland, HI 78719-9628",Moccasin,32.12236479579778,11.435533874300315,36.22355746230224,4.852842407156433,528.9336185650203
    charris@gmail.com,"2781 Matthew Wells Apt. 569
    Potterview, KS 50763-8282",MediumSeaGreen,32.53082944110282,12.354607081759857,37.12234520816764,2.30755242118396,420.91615953269286
    longphillip@yahoo.com,"13044 Woods Heights
    Andreamouth, ND 52317-6007",LightGreen,31.736635686050285,10.748533655415798,35.73870747121452,4.83552866742221,496.93344625553186
    madisonalexander@gmail.com,"791 Allen Trafficway Suite 776
    Christopherland, DC 41460",Orange,34.11756669418932,11.591871665122241,37.743619699549896,3.6785893989539975,519.372976801355
    mfoster@brown-white.com,"36192 Ho Spring
    New Michael, RI 65851-6369",Cyan,33.63662445812838,11.236506758754029,37.67502073290805,5.254708925941115,591.4377355684503
    sanchezkara@hotmail.com,"40494 Robert Park
    Heatherside, IL 70364",SlateBlue,34.33486453305801,11.109456333168433,38.585854757332655,3.8928914802112553,502.40978530290533
    floresbradley@hotmail.com,"446 Daniel Rest Suite 644
    Port Matthewhaven, MN 89465",BlanchedAlmond,34.814983943728855,12.114944955194904,36.28872395038688,4.389455226416517,604.3348400688554
    lamryan@curtis-garcia.net,"96393 Joshua Rapids
    Jonesview, VA 58733",LavenderBlush,34.642669758092204,11.866481205181705,37.71777057005867,4.003325039023281,555.068394054576
    alexandra26@summers-davis.com,"Unit 7032 Box 7016
    DPO AE 44749-2992",Navy,32.83694076702139,10.25654903128796,36.14390845634163,0.7895199078816915,256.67058229005585
    ocortez@gmail.com,"4800 Ashley Spur Apt. 347
    Dannyfort, GA 23352",MediumBlue,32.29964716350497,12.168596472860555,37.073616172195656,4.403369830866465,547.1109823629461
    melinda39@morton.info,"13693 Cox Falls Apt. 693
    Padillaview, PW 28998-0386",Moccasin,31.948017421161357,13.085356892368793,37.60565280041329,2.6485967702033175,461.92087689289787
    lisa94@jackson.com,"40288 Stephens Corner Apt. 221
    West Stephanie, OK 55617-4332",CadetBlue,32.72731919612472,13.013375627349653,36.65127791701514,2.367848224385222,458.3769106506301
    lucastaylor@yahoo.com,"63872 Chavez Lodge
    Danielton, NJ 85847",MediumTurquoise,33.94624061993669,10.9839767277944,37.9514894585739,3.0507129732180167,436.2834981467513
    apark@walsh-obrien.net,"28942 Bradford Crescent
    New Morganfurt, MD 77162-0478",DarkGreen,32.35147815076609,13.105158522307251,35.57484166706179,3.6414971615400877,532.9352188376637
    dominguezmaria@gmail.com,"1768 Rosales Ford Apt. 793
    Lake Markbury, SC 31567",RoyalBlue,34.173752023676585,12.144748536704865,37.25803145871123,3.397363092819078,512.5525343564015
    jimmy11@hardin.com,"496 Bush Turnpike Apt. 674
    Donnabury, OR 32596-0079",DarkGoldenRod,32.97518182625784,13.90991551102909,37.79223754313027,4.297686524285517,630.4227632299235
    patriciajackson@jenkins.info,"981 Matthew Valley Apt. 621
    Lake Tracyburgh, NM 33288-1364",Thistle,32.00475302036483,11.395209434440888,37.33281445580523,3.803364999065175,463.74598112062944
    rayvanessa@fischer.com,"2583 Mark Springs
    Lake Robert, AL 40928",White,34.19705969450868,13.033566182687187,37.07679515601331,2.6334199887174443,493.18021624931
    gharrison@davis.com,"04140 Cameron Brooks Apt. 724
    South Laurenberg, HI 08562",MediumSpringGreen,33.177204666060376,11.622777173031125,35.96889569049678,3.634093727357596,501.2091726816533
    alexandermichael@hotmail.com,"2086 Lisa View
    Ortegabury, MI 43544",WhiteSmoke,32.69323953887129,12.600750401563927,37.37011822360151,3.4670140660097095,501.92826487324413
    christopher66@hotmail.com,"388 Kelly Pike
    West Jeffery, DE 44039-7785",BurlyWood,31.625360134830608,13.187910985159364,37.06708996741924,1.4943108951995074,376.3369007569242
    archeremily@baldwin.com,"USCGC Hernandez
    FPO AE 53064",YellowGreen,31.260646869879523,13.266760352944495,36.97119509745716,2.267251114447051,421.32663125695143
    hornesteven@gmail.com,"91425 Roy Trail
    Rivaston, NE 34949-2588",White,31.720769900287312,11.752343171850052,38.57360522634684,5.023934200606659,538.774933478023
    william28@gmail.com,"16763 Melissa Creek Suite 367
    North Keithland, PW 29458",Cyan,32.922610758349414,11.568116342098419,36.90937820695247,2.471750669720034,398.16346853365195
    karenosborne@yahoo.com,"81814 Pratt Squares Suite 460
    North Robert, GU 77741-1307",SlateBlue,32.68624509039022,12.63857212219212,36.097220934711,4.297737481971207,571.4710341154246
    chansen@holt.com,"2380 Fisher Neck Suite 233
    Brianland, AZ 34453-0625",LightSkyBlue,34.05094675856064,11.388644575171451,39.08156474568163,2.4369588757864635,451.6286105401996
    hallthomas@lane.com,"22630 Bell Centers Suite 030
    North Danielport, FM 31756",DarkTurquoise,32.454552537551066,11.82298329832392,36.94612578169275,3.6569839266881443,490.6004425003995
    taylorkimberly@yahoo.com,"0030 Mathis Square Suite 154
    South Jadehaven, AR 33997-4450",Gainsboro,31.28344747605816,12.725677367222989,35.96566746423624,5.000243360514445,591.7810894256675
    clester@yahoo.com,"76778 Underwood Knoll
    New Gregory, ID 57323",LightCyan,32.980029198453636,11.201159766003189,37.68933697894965,2.412830960970926,409.0704720533178
    pvega@hotmail.com,"61629 Johnson Underpass
    New Eric, MI 92352-5044",LightCoral,31.909626827522736,11.34726361146273,36.323652468198226,5.314354141170213,563.4460356732392
    vmartin@yahoo.com,"30242 Rubio Forest
    Port Kyleland, VA 18339-5779",Turquoise,34.40240964824356,14.220979108167345,37.52319665049046,4.0777750980104255,647.6194557251926
    andreperez@hotmail.com,"17463 George Ports
    East Julianborough, WY 68291",DarkOliveGreen,32.95976431107423,11.546275759510358,36.947953692845566,3.2750706813095327,448.34042501104767
    anntaylor@hotmail.com,"PSC 1634, Box 8167
    APO AA 49814",Teal,33.780156763295054,11.91763618310149,36.84473381504451,3.6349960063068965,518.7864830920807
    hickmanelizabeth@yahoo.com,"12641 Greer Track Apt. 183
    North Mitchell, IA 77991-6276",DeepPink,32.6729435250038,12.276056984463208,37.19279353222784,3.9824715131070567,523.6339351357243
    halljohn@yahoo.com,"311 Savannah Ramp Suite 245
    Carlsonbury, LA 08453-6035",MediumTurquoise,32.72852076313786,10.131712461927215,34.84561239331277,3.287701824074408,393.8573709860865
    cohensean@yahoo.com,"3751 Green Loaf
    New Julia, VT 20897",DarkCyan,33.40992258786484,12.026942222615626,36.13389429009422,2.3133498845806395,426.154547713103
    jmartinez@anderson.org,"14889 Page Prairie
    Dennisville, NV 27982-4210",PeachPuff,31.72420252384518,13.172287495263063,36.19975347391624,3.557813698186695,503.38788728796044
    cbrady@gonzalez-miller.com,"193 Ashley Plaza Suite 706
    Hernandezport, WV 71270-7338",Aqua,32.711119299295326,12.326291385476884,36.67387835766538,3.3502792875449092,482.6024673294826
    pkline@hotmail.com,"PSC 6338, Box 7637
    APO AA 22066",MediumTurquoise,33.1366552476793,13.891313421778493,39.22071295098572,2.9070949348220267,524.7976275698039
    martha91@garrison.net,"360 Albert Spring
    South Tylerbury, VA 92641-9077",HotPink,34.37939438496412,12.930928541308226,36.36024719793431,3.7927119551515887,574.6548433659395
    maureenlopez@gmail.com,"82537 Alice Centers
    Gregland, OR 71749",SeaShell,35.530904145898624,11.379257182400217,36.63610411908917,4.029453828152192,574.7472196620896
    russellbaldwin@ferrell.info,"295 Michael Keys Apt. 706
    Ericfurt, KS 09476",Orange,33.24726795047748,14.069382336483997,38.993322451155734,4.978475793470261,660.4251842914138
    amandastanley@yahoo.com,"38528 Jerry Valleys Suite 027
    Jonesstad, NY 74787-2691",CadetBlue,32.096108993845185,10.804890557641668,37.37276214632111,2.6995620549722683,375.39845541024306
    george02@hotmail.com,"3286 Lynch Field
    Henrychester, RI 41833-7902",LightCoral,35.039283064909725,14.426491050422623,37.37418350489759,3.9306153266132897,640.1877400085721
    swilliams@ball-arroyo.com,"450 Samantha Valleys
    Collinsborough, KS 37205-9891",Orchid,32.55052657442161,13.041244588162265,36.655208083959465,3.4562338235263015,514.0098178487356
    taylorjared@foster.net,"601 Mitchell Estates Suite 922
    Port Daniel, WV 83595",Crimson,32.58249357081853,11.739743796165987,36.85481082475086,2.1820169698233887,376.49684071853704
    keith13@yahoo.com,"81830 Katie Squares
    Port Austinland, FL 73522-0761",LightGoldenRodYellow,33.29698192462649,12.49105873801881,38.238940853091385,2.7095266269292764,484.5198091105511
    schmidtdenise@hotmail.com,"06392 Matthew Viaduct Suite 000
    Lake Ronald, NY 45787-0181",DarkGoldenRod,33.108336148346,12.892374513653694,36.52738830431376,4.5941168646031905,614.7296376283244
    jasmin20@salas.com,"634 Nancy Shoals Suite 241
    South Barry, AR 52307",HotPink,33.902717794463925,11.668866514553862,37.34126616101072,4.25698328967803,567.4750105270774
    christophermorrison@mcguire-carter.biz,"90089 Eric Well
    Nicoleside, MT 95918",Blue,34.55528258670921,11.777772039564965,37.97982686004657,3.7842730870783043,554.003093429799
    deborah51@yahoo.com,"4190 Shelton Harbors
    North Christopher, RI 60962",Violet,33.73264839262621,12.138793877121689,36.853882459920776,1.6234196094562199,399.98387159812256
    melindahartman@gmail.com,"3761 Jared Mountain
    Nicholasport, WY 51181",Pink,31.600512200303292,12.222967446546058,36.8227532265912,3.4145062403052493,479.17285149109694
    sharper@yahoo.com,"239 Bush Fall Apt. 906
    Riveraville, KY 88906-3319",SandyBrown,34.318927438542204,13.402331896928283,37.29204470528371,3.6060868889081727,585.9318442972224
    jessicabrewer@simmons.net,"5052 Mccoy Passage Apt. 328
    Teresaport, FM 97139",LightBlue,34.00648891839723,12.956276605432244,38.655094538522064,3.275733705185027,540.9957391083377
    beckycarson@jones-brown.biz,"78787 Mitchell Lights
    Matthewville, AZ 30310-0130",Gold,33.54047906012372,12.884124621344766,36.22604169397467,5.0072719865899025,628.0478039330167
    jennifer24@hotmail.com,"46954 Melissa Corner
    North Amanda, LA 34844",SteelBlue,34.43642583784763,13.325469096138633,36.76860309148005,3.3712581132239197,582.4919237338106
    jeremy00@yahoo.com,"45442 Barber Key Apt. 882
    South Jaclyn, NM 24367-3001",FloralWhite,33.55169913754013,12.15858523387948,36.57513377612486,5.453969474611709,640.7861663983061
    wellsjuan@schroeder.com,"0338 Francis Junction
    Lake Alexstad, NH 14302",Green,31.818616566769066,11.226545663510619,35.669935165958194,3.7558693892629655,446.41867337013565
    gregorystewart@hotmail.com,"232 John Haven Suite 456
    Johnsonhaven, VT 90106-0173",PaleGoldenRod,32.36312129411639,12.461135435006733,37.74560774187829,4.664258497238649,570.6300980875259
    tammyjones@griffin.com,"0859 Audrey Isle
    South Zachary, AS 09138",Navy,33.191570884444964,9.846124908736233,36.876313233417314,3.8066709485629935,423.3083340974698
    djohnson@hotmail.com,"5358 Stephen Parkway Suite 894
    Kimview, MN 17436-4528",Coral,32.19249882778649,13.32541218598226,36.897294609068695,5.0499274746524065,616.6602860166826
    kenneth27@smith.com,"721 Robert Viaduct Apt. 052
    Lake Olivia, MO 93807",DarkGreen,32.60790271932764,13.677245841523792,37.74469969514907,2.871947536151015,530.3624688854229
    johnathan33@yahoo.com,"836 Amy Villages
    Hannahside, RI 09207-2616",LightSteelBlue,32.26200310699493,11.644969546399302,37.02687697079434,3.2367328142505314,442.3631173838644
    carrillojacob@perry-larsen.com,"909 Hicks Mountains
    Gabriellaport, MD 33121",Aquamarine,32.27184828087499,13.485008988077055,37.55088041321525,3.0863372723173246,511.9798599920658
    greenelizabeth@edwards.com,"54051 Jenkins View
    East Danielshire, IN 32905-7784",DarkViolet,33.79512493081247,11.620996507575207,38.4194685327455,4.559699083258959,560.4437921717631
    denisemorrow@johnson-james.net,"24458 Hudson Square
    Hallside, PA 68038",MediumSpringGreen,31.654809675692764,13.014459152355208,37.78903634703419,3.0102097779609496,475.26342372754846
    wandaphillips@leonard.com,"149 Monica Vista Apt. 908
    Jasonberg, TX 19632-8886",OliveDrab,33.07773079450243,11.466984219092826,35.675727630820134,1.80922959177631,374.2696745439231
    zachary94@gmail.com,"99902 Scott Road
    Joyton, MT 46760-7400",Purple,31.312349599444346,11.684904192367503,38.71707629773135,3.594295099901167,463.59141802794056
    ppowell@gmail.com,"74260 Carly Mews Suite 703
    Jonesberg, OR 39594",BlueViolet,32.87273861448019,12.093966355379461,36.62077385548951,3.049195743789432,471.60288439289195
    bhill@pierce-kane.info,"3324 Branch Squares Suite 221
    Riddleton, OK 34594",RoyalBlue,33.708153408093004,14.325654943309248,35.7218273299056,3.6343402240734415,626.018672655394
    matthewgraves@mills-shaffer.com,"66636 Jason Parkway
    Kellyside, NV 67033",DarkSeaGreen,33.908565031728365,12.914846634589116,39.06886445133981,1.4823596439649784,432.47206125141577
    nwagner@yahoo.com,"Unit 2079 Box 7792
    DPO AP 47668",AntiqueWhite,32.312909745943095,9.8244017703894,35.74277912557426,2.921350140816143,356.6155678900057
    jamesfaulkner@hoffman-wolfe.org,"Unit 0474 Box 0661
    DPO AP 48938-3469",Blue,34.394326648449855,12.807751833234732,38.55103028983871,1.8100798764120298,467.4278485003528
    phillipscarrie@gmail.com,"625 Andrew Locks
    Madisonside, AZ 74068",FloralWhite,32.42330472721988,13.058277927143259,37.26387556144864,3.373104673991114,503.2173931191067
    samantha84@cortez.com,"960 Miller Union
    East Virginiastad, MS 74191-2346",Navy,33.539396346976595,10.534553499461076,37.03479128933126,2.2147975193939367,378.4735664479011
    edward29@knapp.com,"4029 Gerald Cape
    South Laurenborough, SC 19130-5133",DarkOrange,33.37401692609311,11.143433077943628,35.94639914639545,5.4544632775645265,584.2183134866808
    hannahgilbert@gmail.com,"6961 Mary Stravenue Suite 857
    Hilltown, TX 52813-7703",Aqua,33.79475594486519,10.982805534662877,34.81063145023747,3.201801722174991,451.7278633175868
    lschroeder@gmail.com,"93101 Shannon Common
    South Destiny, ND 30379-2855",Ivory,33.7709000976483,11.153966054877388,37.24032955207884,4.7294845415725035,557.6341089957288
    thomaswendy@yahoo.com,"449 Amanda Tunnel
    Joshuahaven, CO 15377",LavenderBlush,31.309192640891823,11.947175323941773,36.19083323650043,3.205529764506833,432.7207178399336
    fuenteskathryn@schmidt-johnson.org,"839 Heather Cliff
    South Blake, SC 90412",Cyan,33.612563354981084,11.470565004665819,37.0616887661275,3.802511438790271,506.4238599698002
    melissa08@rowe.net,"13799 Cortez Inlet Suite 733
    East Stevenshire, AL 32757",Tan,33.39826012958678,11.03785041365591,38.61733445368848,4.116340467131812,510.1598172791045
    bradleysmith@barber.com,"581 Gilmore Port
    Heatherville, MS 20879",PaleVioletRed,33.622591840455804,11.167356897497287,35.62658733096311,5.462500764129899,587.5747994806404
    morganorozco@hotmail.com,"0001 Mack Mill
    North Jennifer, NE 42021-5936",LightPink,30.492536696540196,11.562936246652605,35.97656497174036,1.4816166268553612,282.4712457199145
    johnsonhannah@gmail.com,"634 Robert Hill Apt. 800
    Coxtown, OK 32430",Thistle,31.904857131013614,12.22772827968665,36.98591347608606,3.771420131891554,473.94985742281614
    javier02@landry.net,"Unit 7029 Box 3429
    DPO AE 56975",CadetBlue,33.0264203526517,13.18681287300118,38.06692960186935,2.8982995778886362,489.90805309753534
    lmalone@gmail.com,"USS Beasley
    FPO AP 50556-7615",AntiqueWhite,32.975192902963855,13.394451788942055,37.80697766984659,3.5690465158585187,541.9722037582585
    brandon77@richardson.com,"109 Jessica Manor
    North Patriciashire, PR 84726",GhostWhite,30.81620064887634,11.851398743073139,36.92504303887863,1.0845853030221226,266.086340948469
    bhamilton@shaw.biz,"036 Mary Drive Apt. 581
    Port Brandytown, FL 66143",DarkOrchid,33.91401511732236,12.266503838947585,36.57503097579012,3.0234744460455456,494.6871558102853
    randyrobinson@hotmail.com,"14548 Hayes Isle Apt. 436
    Garciaville, IN 65366",DarkGray,33.30267220801569,13.459222289832477,36.33952101023726,5.56638489205681,689.7876041747194
    ecruz@yahoo.com,"08111 Barry Highway
    Bentonberg, GU 13706",Gainsboro,31.912075929200608,11.792971821961505,36.257819118501914,2.3951681299791368,387.5347163057077
    wrightdanielle@gmail.com,"508 May Highway
    Port Jacobview, MN 31932",DarkSalmon,32.40855895733437,10.98574015235435,37.36839124072731,3.5048334855203,441.89663151788625
    deandanny@yahoo.com,"9781 Lopez Spurs Apt. 300
    Fitzgeraldborough, MA 89035-4317",Ivory,32.64461690576892,12.637557159364277,36.517085763648595,5.226687712532107,604.8413188212227
    dblair@gmail.com,"190 Kelley Burg
    West Juliaport, IA 35826-8163",MediumSlateBlue,34.10227850874102,8.508152176032603,35.46240008104617,1.8382107022501144,302.189547809652
    veronicapruitt@hotmail.com,"Unit 7502 Box 8345
    DPO AE 53747",Cyan,33.24850620315415,11.656592033851751,36.54860515461888,3.3634113937857375,479.61481167314264
    davischristina@hotmail.com,"49352 Avila Terrace Suite 624
    Amandaland, GA 99736",SeaGreen,34.72908016563062,11.966898076780602,36.54759627699103,2.957448756503683,506.132342437705
    douglasdunlap@boone-rose.com,"093 Larson Ports
    West Kathryn, OK 91243",Purple,30.3931845423455,11.80298577760313,36.315763151803424,2.0838141920346707,319.9288698031936
    david28@wallace-hill.org,"43382 Heather Meadows
    New Lisaburgh, WI 19151-0302",LightBlue,33.3841105711181,12.677401437121034,35.622530591605994,3.680847338174777,528.3092250312227
    williammoore@rose.com,"686 Baker Fords Suite 893
    East John, IL 50171-9547",Brown,32.878474365657695,13.032534975943191,37.87095205416159,4.693732057983859,610.1280331303979
    angela25@walker.com,"456 Eric Views
    North Amanda, MS 98876-3102",Chocolate,34.501417852783966,12.44761745405695,37.53453024067718,4.008352234634593,584.1058850493533
    arice@reynolds.info,"740 Marshall Squares
    Davidbury, AL 94251-0846",Thistle,33.56647438959015,12.235659245108506,37.27757337619507,2.532044061507893,466.42119882174364
    adam75@gmail.com,"9991 Macdonald Squares
    Vasquezborough, WY 73586-4597",Purple,32.8487928288471,10.973162084317348,36.60950715426321,2.8709869096996963,404.8245288726869
    charlesgutierrez@hotmail.com,"363 Kathleen Underpass
    Ashleyside, PR 98964",MistyRose,33.531860130613246,13.665769794267849,36.90022076162611,3.515688256202335,564.7909690079206
    codyandrews@hotmail.com,"63010 Reyes Creek Apt. 569
    West Catherinetown, MN 67491-6816",Indigo,33.41906734548329,13.391120179234008,37.194191046463956,4.06991661858986,596.516697973153
    wheelernancy@hernandez.com,"66340 Michael Lane Suite 878
    West Brian, LA 69137-1147",Gold,32.495418773654315,12.96832561098067,38.296110372778266,1.2004838567566694,368.65478494706446
    drew27@ryan-thompson.com,"4475 Lopez Stravenue Apt. 690
    Smithchester, NV 84347",PeachPuff,33.67402747501462,12.968893130527093,37.333107418297075,3.22945090446699,542.4124767293989
    suzanne63@gmail.com,"229 Eric Mountains
    New Caleb, PA 00396",LightSalmon,33.26463207316392,10.732131340303663,36.14579171248221,4.086566338485993,478.26212639683575
    mitchellscott@gmail.com,"3976 Tom Streets Suite 438
    Port Davidtown, AL 55334-2369",DarkOrange,32.76245596030955,10.952353380458653,37.64629178743077,4.019470351595002,473.360495571661
    laurajimenez@gmail.com,"06103 Erik Fields Suite 781
    Jonesmouth, GA 49931-3078",SlateBlue,33.47947160188164,12.60888879370027,37.22939451627662,4.205903889533483,559.1990479544186
    rogersheather@hamilton-jensen.org,"510 Michele Port
    East Angela, HI 23618",MintCream,33.785207205733194,13.039511025284968,36.31272657154038,2.0181946292873114,447.18764430541864
    ievans@hotmail.com,"2064 Poole Groves
    North Chrisland, SC 78169",NavajoWhite,33.21718784289895,10.999683661085923,38.44276668680506,4.243812816726185,505.23006828207065
    john85@rodriguez.info,"57120 Frank Keys
    Jerryborough, DC 81028-0939",Tomato,31.128090049616628,13.278956228597716,37.38718052656558,4.626075291951958,557.2526867470547
    phillipsmark@byrd.net,"6734 Perez Trafficway Suite 395
    Nunezland, NC 83245",DarkSeaGreen,33.36951735608769,10.62794922615627,38.04031366664072,3.00295702283384,422.3687366068266
    elizabeth61@berg-braun.com,"649 King Extension
    North April, NY 54175",Lavender,32.837893053239185,13.185181167368498,35.92159518889928,1.8235951829918027,445.0621855089249
    dbenson@simpson.net,"732 Heather Place
    North Michael, VT 92527",DodgerBlue,30.574363684171367,11.351049011250831,37.08884657968332,4.078308001651641,442.0644137580656
    stephaniehill@hotmail.com,"8248 Parker Overpass Apt. 024
    Lake Pamela, WY 44322-1735",Wheat,32.27459383033916,12.954811454937932,37.1088163801084,3.6899166154475918,533.0400601788124
    davisbriana@gmail.com,"15298 Erickson Shore Apt. 056
    South Patrickfort, MD 16503-3145",MediumVioletRed,33.14423399987652,11.737040635272379,37.93518904595916,2.190132185380053,424.20282709903245
    kday@gmail.com,"4835 Jessica Walk Suite 205
    West Jacob, NH 93681",Magenta,33.4855197629536,11.887345302061831,35.86244707788159,3.2067566975868704,498.63559848917595
    jonathanconner@morales.biz,"920 Anderson Extensions
    Greenfurt, GA 19316-3498",SeaShell,31.976480061461288,10.757130926114415,36.59586794587455,1.9770071278430592,330.5944460341002
    anneingram@miller-alexander.com,"4301 Park Lake Apt. 158
    Spencertown, SD 45934",HoneyDew,32.13386240984833,11.612650769570312,39.24880390433504,3.349245382527182,443.4418600624623
    jeffery48@mcguire.com,"52326 Townsend Centers
    Lake Williamburgh, NJ 70568-7463",LightCyan,32.302553103111435,11.979061483915341,38.26906069147024,3.532861579556475,478.600915944333
    theresamitchell@martin-chambers.biz,"157 Linda Roads
    New Jimmyshire, MH 51942",Khaki,31.82797905546526,12.461147444665416,37.42899736939191,2.9747368150832405,440.0027475469415
    christianwade@butler.info,"3687 Sarah Ranch Suite 919
    Gainesfort, AK 05665",Crimson,32.018074010632084,10.079463451952432,38.0706642585136,2.6181653103960847,357.7831107453153
    tina16@santiago.com,"314 Kidd Run
    Johnfort, KS 46546-2732",White,32.997459002491695,12.589240561061523,37.33224074655334,2.8040136926903942,476.139246872566
    vancealicia@hotmail.com,"06307 Scott Spurs Suite 161
    Jessicaburgh, NH 26093-5908",RoyalBlue,31.81642833419931,14.288014590766299,36.77386136993079,2.9644978762354017,501.1224915036564
    dbell@hotmail.com,"3485 Anthony Street Apt. 119
    Mikeberg, FL 32602",DarkViolet,34.46151473966461,11.917115695587762,37.76668677332467,4.3508878437244665,592.6884532021675
    pamelahampton@martin-cobb.com,"91542 Jessica Springs Suite 255
    Thomashaven, MT 39239-3790",DarkSeaGreen,32.34279623166797,11.40964461636565,35.77778217066089,3.8724320418689104,486.0834255029927
    mark81@wagner.com,"410 Gonzalez Corners Apt. 187
    East Stephenport, VT 22771",Navy,32.30274837339047,12.815392648610311,37.95780983454751,4.615426306527649,576.0252441251166
    awerner@manning.com,"407 Blake Ways
    Port Davidland, WA 78438",Gray,33.06644065628263,11.673229254101274,37.84065507750671,2.727209453758874,442.72289157427144
    robertramirez@kaiser.com,"1583 Anderson Coves
    East Rebecca, NH 27212",Purple,33.894640388465476,10.61053651970745,37.97738873797974,3.537123879902206,461.7909590614097
    justin26@gmail.com,"32303 Baldwin Causeway
    South Robertside, HI 58126",RosyBrown,32.765664587506606,12.506548190327935,35.82346666642284,3.12650948966,488.387525780145
    douglas95@yahoo.com,"395 Summers Courts Apt. 413
    Coopermouth, IA 21205-1079",White,33.76981237165136,11.304462307422884,37.833971728598954,5.137816745950984,593.1564014822196
    qmorse@yahoo.com,"0360 Pearson Dam Suite 263
    Lake Shawn, UT 65986-4190",MediumTurquoise,31.812482559724266,10.886921180951674,34.897827688311345,3.1286388557446334,392.81034498379734
    jason50@bates.net,"74839 Michael Plains Suite 356
    South Austinshire, ND 40309-1424",Bisque,32.00850451785513,12.095889485093478,36.37750903434099,3.1789524050534483,443.19722102875545
    qeaton@savage.com,"27032 Michelle Forest
    Morrowtown, ND 14749",SaddleBrown,33.30433661798984,12.692661429739388,37.33359061333867,3.8273759151075666,535.4807751896418
    tluna@hotmail.com,"01512 Hendricks Rue
    East Pamela, PR 46481",YellowGreen,32.189844729273545,11.386775551280651,38.19748324839899,4.808320372869162,533.3965537868428
    kara33@gmail.com,"5527 Hogan Road
    South Jeffreychester, MA 28632",LavenderBlush,34.935605105644306,10.728418539377822,36.88119240747175,4.048510087289211,532.1274491097012
    thomas22@yahoo.com,"7346 Jennifer Green Suite 148
    Wagnertown, MT 65972",IndianRed,33.55165060797954,11.936895159842097,35.90025278215821,4.5433324132930855,558.9481123879059
    david47@hotmail.com,"37216 Krista Drives
    West Andrew, DE 70036",DarkKhaki,32.38696867463189,12.717995102314035,35.12882235312117,3.4810621331251683,508.77190674151797
    beasleyjoseph@hotmail.com,"1094 Bentley Forges
    Lake Antonio, MA 29181-3664",SaddleBrown,33.34450868519732,10.969802874106238,35.9745781075859,2.627624971434411,403.7669020956173
    hoffmandaniel@yahoo.com,"922 Hampton Path Suite 198
    Port Jasonmouth, FL 46623",Orchid,33.6727578867203,13.420545742201174,37.76369040280343,4.794312263402832,640.5840618984408
    garnerjustin@king.com,"0833 Brian Canyon Suite 566
    Anthonymouth, VT 01329-7541",DarkCyan,34.00207092262163,11.85468192110211,37.491892210406924,2.761861926301417,461.62827839108616
    francesjohnson@lee.com,"577 Peters Turnpike
    Loriport, MA 60572-1669",Aquamarine,32.65539704223188,11.91885970932454,35.71626915951701,2.1596760229888288,382.41610786547506
    awu@robinson.org,"0281 Dale Wells Suite 656
    East Joshua, ME 73389",Brown,32.054261851184755,13.149669557991398,37.65040020345744,4.1956144126751305,561.874657668983
    xevans@hotmail.com,"13164 Miller Camp
    South Deannaberg, ID 85433",DarkMagenta,33.22877226969563,12.685393899848075,36.04898625036686,2.139403004485981,444.57614413373005
    lauriewilson@jackson.com,"389 Joshua Stravenue Apt. 983
    Martinezland, MN 29049",Cornsilk,32.077590044329135,10.347876945661577,39.04515569638811,3.43455972254092,401.03313521910604
    cruiz@yahoo.com,"497 Julian Brook Suite 872
    Hillberg, FM 87927-5760",LightSalmon,33.981005579787784,9.316289204373824,36.91495154541398,2.8684281816397523,384.3260571375157
    tammy12@gmail.com,"78297 Brown Street Apt. 786
    East Taylorfurt, AK 97246",Chocolate,34.17951756796679,12.581547729914535,35.444264696393994,3.1370689754806826,527.7829957560522
    adamperkins@terrell.com,"2595 James Creek Apt. 571
    Millerberg, HI 82236",PaleVioletRed,32.60273898042012,11.764447589452987,37.922703809566,3.5258064121952244,482.14499687576796
    willie26@johnson-howard.com,"97686 Robertson Cape Suite 607
    Port Veronicaside, NE 47293",Wheat,32.03054971621298,12.644202118863696,38.00182746752369,5.038107493844868,594.2744834186117
    yvaughn@meyer.com,"9863 Dawn Court Suite 429
    Lake Connie, MI 12238",OldLace,33.100357750772915,11.832112231483734,36.841491638054855,3.6122391519936996,502.0925279023197
    carolfarley@gmail.com,"51173 Curtis Cliff Apt. 727
    Ramoston, DE 32714-4579",SlateBlue,32.99059904291544,10.441235061603205,35.93896250240334,2.8950751628043556,407.65717875932603
    rhonda01@gmail.com,"939 Watson Run
    Staceyberg, VT 58376-0454",Orchid,34.385820292995376,12.729719510423307,36.232109802584205,5.705940716620838,708.9351848669819
    david80@knight.com,"368 Morris Ports Apt. 735
    New Lisaville, GA 34271-8632",MediumAquaMarine,34.357196268204405,9.477777607959723,37.90601452014432,5.0470225513950995,531.9615505451646
    aaron04@yahoo.com,"16338 Scott Corner Suite 727
    West Alexandra, AR 54429",SeaGreen,33.70511279750195,10.163179060052556,37.76304108154524,4.778973636034998,521.2407802357948
    kaylahenderson@hotmail.com,"Unit 1609 Box 3480
    DPO AA 95185",MediumSpringGreen,32.40429504598358,11.608997936221536,38.11045690682496,2.96655888465992,447.3690271993314
    mholt@hotmail.com,"486 Adams Hills
    North Walter, MS 18124",LightSeaGreen,31.829346455921133,11.268259230574026,36.9569654250941,2.6689197733345025,385.152337987975
    tanya20@gmail.com,"69279 Stewart Mountains
    South Pamela, KS 22541-3414",DarkKhaki,31.366212167187687,11.163159542913277,37.088319364334765,3.6203545888040867,430.58888255648486
    aaron89@gmail.com,"0128 Sampson Loop Suite 943
    Hoffmanton, MO 02122",SaddleBrown,31.447446494127817,10.101632204781014,38.04345265084127,4.238296188412728,418.602742095224
    hunterlucas@gmail.com,"89301 Kylie Crossroad
    Petersonberg, MH 23834",Turquoise,33.58294683702328,12.761531278201021,36.90818962373682,2.4793398232086954,478.9514047578855
    sfarley@jones.com,"0554 Powers Curve
    Nathanchester, FL 06878-6336",AntiqueWhite,32.39742194430904,12.055340161330117,37.68546548721554,3.506967573635258,483.7965220614929
    sarahtran@dixon.com,"770 Katie Walk Apt. 585
    Port David, MN 52850",GoldenRod,35.03744996157605,11.935934966559183,35.78392374450292,3.310150346576856,538.941974531203
    randywhite@armstrong.biz,"0506 Pitts Forks
    Woodsbury, AL 98082-8186",Teal,32.78494023263413,12.451200012438312,36.66579136924871,3.5358024678738276,486.1637990666317
    tsmith@yahoo.com,"92028 Thomas Mountains Suite 044
    New Matthew, MI 02429-0994",Bisque,33.9717220376126,12.284467067067208,38.29572526401705,1.1304769604319769,385.0950070687634
    martinezleah@carter.com,"8456 Joseph Locks Suite 926
    Christopherport, TN 57784",PaleGreen,33.38599019075222,12.782171794760183,35.55077226680613,3.2287176862706497,527.7837897574573
    steven00@combs.com,"64460 Morris Fords
    Gonzalesmouth, MI 40832",RosyBrown,33.556555671402755,12.960307128914414,37.951946317735135,3.3459223210048927,547.1907493518986
    blakekent@smith-pena.com,"3933 Brooke Point
    Johnsonburgh, DE 22659-3488",Crimson,33.58737339024554,9.95399500605983,37.34573893439929,3.2156668270219866,410.60294394921505
    amanda03@yahoo.com,"313 Lisa Loop Apt. 543
    North Jenniferchester, MN 58819",Brown,34.18818406101828,13.130021664776669,35.42933438847124,3.7905521368804433,583.9778019715428
    brandonsmith@yahoo.com,"62106 Nathan Mountain Suite 505
    North Matthewborough, AZ 32092-6122",Gold,33.59396354804201,11.520566788562215,36.18913179541947,3.5612152714310823,474.5323294398898
    thardy@perry.com,"39209 Cooper Neck Apt. 541
    Tylermouth, ME 94450",SeaGreen,33.236265721508744,10.972554314292413,34.57402758718963,2.931619534651152,414.9350606518193
    michael86@yahoo.com,"87270 Garrett Cliffs Suite 361
    Brooksberg, MO 26555-2502",LightYellow,33.20891970058922,13.53191346185937,38.95246252162795,3.0465406206892376,550.8133677324173
    ulee@wells.com,"309 Singleton Hollow
    Matthewhaven, NJ 68776-7477",LemonChiffon,33.63781167586591,12.039502370469922,34.48718474774243,2.739200466766662,458.78113168424994
    judithsmith@jimenez.biz,"186 Anthony Route
    Gordonview, AS 78120-4633",DarkOrange,33.59048580327403,10.942069621017652,36.17049420248099,2.783963128204522,407.54216801343483
    nblack@smith-romero.biz,"00615 Tracy Islands
    New Marcfort, MO 87297-7431",LightCyan,34.195508030962635,12.664192622515646,37.02715036476952,4.330407444211276,581.3089328795
    michaelcampbell@yahoo.com,"96480 White Lane Suite 521
    Pattersonhaven, OR 39409-4561",Gray,35.86023651335309,11.730661394277831,36.8821490815068,3.41620997759013,546.5566668627299
    rcarter@crane-thompson.org,"14064 Frazier Hills Apt. 176
    Amyborough, MP 77858-0018",MediumVioletRed,33.48193057257537,11.918670307379347,37.31770494919684,3.3363393820041853,503.1750851912004
    dwhite@gmail.com,"02136 White Grove Suite 418
    Marytown, DE 70033",OrangeRed,33.25823783380398,11.514949066574868,37.128039498322295,4.662845304002564,549.131573287217
    vancemichelle@gmail.com,"6586 Reginald Crest Apt. 061
    North Josephfort, NM 55275",DeepPink,32.319857972167306,12.418113202231622,36.155336204959546,3.222080766760957,482.83098586170183
    kylemelendez@hotmail.com,"2749 Cunningham Flat Apt. 838
    Derekberg, OH 45288",DeepPink,32.43083857908201,13.887275413385504,38.38195597213616,3.7729690246447083,557.6082620533542
    richard35@hale-duncan.net,"33940 Craig Throughway Apt. 334
    Martinview, IL 62015-0314",GhostWhite,31.44597248275779,12.846499067474369,37.86921693600857,3.420149530164856,484.87696493512857
    waltonkaren@gmail.com,"355 Villegas Isle Apt. 070
    West Jenniferview, NM 26775-4339",Green,35.74266980593494,10.889828283005029,35.565436237139735,6.115198945760052,669.9871405017029
    contrerastiffany@gmail.com,"439 Todd Summit Apt. 478
    Mooreland, AR 31655",CadetBlue,34.012619460656374,12.914570094327917,36.046203518424534,3.488029991222591,547.7099885778625
    rogerstiffany@wilson-horne.com,"30700 Justin Ports
    Port David, PA 52171-5921",DarkOliveGreen,34.14039342796294,11.568526641744768,38.918748541019504,4.082855278762214,537.8252822957112
    waltercharles@sanders.net,"291 Stephen Glens Apt. 532
    Jacquelineton, NJ 53606-5656",IndianRed,32.37798965892753,11.971750786570595,37.19936752783635,2.8296995751470893,408.2169017707518
    john96@chan-anderson.biz,"04290 Barron Square
    Laurenmouth, AS 79917-9544",Snow,33.17233109074306,13.07869243953642,37.329818625212354,5.405406467229508,663.0748176067602
    bushsharon@barber.com,"0013 Andre Field
    Whitebury, AZ 68447-6306",DarkSeaGreen,33.24732220295966,11.956426484854195,36.5173461200418,3.451750709833103,506.37586675019753
    nicolegay@jennings.com,"50718 Timothy Light
    Garciaport, SC 60266-6696",BlueViolet,33.59891333929404,13.252737094184228,37.30596141998359,2.935577273740486,528.4193296952955
    rchambers@hotmail.com,"53964 Weaver Brook Suite 861
    Stevensonshire, NY 18128",OliveDrab,33.08529799058909,13.093537281195058,38.31564796064117,4.75036007144446,632.1235881419656
    gomezalicia@hotmail.com,"506 Allison Cove Apt. 766
    Weeksstad, AS 71308",MediumSpringGreen,32.278443347919655,12.527471744522868,36.688366542504845,3.5314023030588984,488.2702979651482
    potterkenneth@strickland.com,"2559 Harris Pines Apt. 514
    Michaelshire, ME 21753-8834",MediumSlateBlue,33.441553044751224,11.235968954252515,37.05261630809583,3.904479379627935,508.7357409506604
    charlesjackson@brady-fuller.net,"3802 Veronica Causeway
    East Patrickfurt, DC 84522",GhostWhite,32.86530120924307,12.074830167957376,35.56917031744619,2.3990797897904113,411.1869635742789
    jacquelinewest@pace-herrera.com,"592 Villanueva Village
    Woodsstad, AK 20530",Purple,31.52619789823981,12.045331979699332,38.50588332918249,2.847709026474498,409.09452619233787
    stevenjohnson@yahoo.com,"PSC 4427, Box 6116
    APO AP 87584-5187",SandyBrown,33.000849640152055,11.230743306761045,36.99529016635977,3.781703565104839,467.8009243667916
    johnsonchelsea@gmail.com,"19270 Velasquez Coves
    Boylechester, AZ 51480",LightCyan,32.088380630448206,11.90784409977911,35.18912244437772,4.34977841863416,512.165866388158
    jenniferjenkins@jones.com,"USNS Jacobs
    FPO AE 71507-1312",LightSalmon,33.26544447284578,13.05221038516131,38.775665296116884,4.574287716419565,608.2718166151668
    ebutler@rogers-gonzalez.com,"001 Estrada Union
    Lewismouth, TN 47360",Chartreuse,32.992573196692234,13.004362005673078,36.98504141740091,4.620416384895069,589.0264897562791
    ellenlucas@cox.org,"86268 Davis Corner
    North Danielview, CT 59551-9382",DarkGoldenRod,33.86318870719846,11.52352268106905,35.9380452301724,3.0130325004194374,444.05382657277266
    elizabethnunez@vasquez-nelson.net,"209 Andrew Viaduct
    Port Anna, OR 01627-8037",Cornsilk,32.59209322575472,10.314717921893896,36.72902940108787,4.791108744558267,493.18126139071865
    ramirezjacob@turner.com,"19704 Kaitlin Flat
    West Andrewtown, VI 38642",Magenta,32.381034590963445,12.433128529733452,37.626906802047884,4.334001444341368,532.724805462904
    brian51@cook.info,"0508 Terrance Cliff
    Rebekahtown, NC 48724-8308",SaddleBrown,31.517121802506228,10.745188554182882,38.79123468689964,1.4288238768282668,275.9184206503857
    victoriajohnson@gmail.com,"2082 Christopher Place Apt. 081
    Cynthiahaven, HI 99393-8910",DarkViolet,33.45430192604019,11.016755636715029,37.6373109611636,4.137000388171067,511.0387860511611
    lawrencewalton@hotmail.com,"584 Patterson Falls
    West Alicia, DE 45751",Chocolate,32.21552741998912,12.216854693359824,36.95395970110429,2.910530822492482,438.41774201146853
    ashleymoreno@gmail.com,"11430 Meza Green Suite 037
    Martinezborough, FL 40624-8726",DarkViolet,31.673915503274955,12.329147021418827,37.07437106706513,3.9824623189556387,475.7250679098812
    wesleyvance@moore.com,"210 Johnson Street Suite 717
    New Bethanyborough, MO 84817",Magenta,33.717554613005134,10.8069660677747,36.01231723045213,3.701229217020273,483.54319386538816
    edwardbrown@yahoo.com,"2971 Angela Island
    Lake Timothychester, NE 48734-6685",HotPink,33.21547157476038,12.135101396955722,37.14209368933963,5.8405058759314255,663.8036932755082
    youngellen@hotmail.com,"994 Joel Highway Suite 216
    New Jessicafort, UT 14179",DodgerBlue,31.574138022873235,12.94155572990243,36.72527682557127,4.560396067343641,544.4092721605869
    robin80@yahoo.com,"928 Bailey Road
    East Mary, DE 11678-5634",Turquoise,33.89457038870139,13.300299363336556,36.393683855020775,4.4900020655598345,630.1567281670505
    dana59@hotmail.com,"31927 Jill Mountain
    South Jessica, MN 63418",Blue,33.12869268643142,10.398457713085639,36.68339299807869,3.859817998874009,461.11224843060927
    bwilliams@hotmail.com,"1549 Walker Passage Apt. 463
    West Calvin, AZ 03144",PaleVioletRed,34.3703270461643,11.887800415781037,37.86144725932397,3.0466201888222324,491.9115050963458
    whitetyler@anderson-avery.com,"4547 Stafford Throughway Apt. 178
    North Patrick, MD 60768-4837",MidnightBlue,34.08026009173408,11.591439703136587,36.456898410524325,4.652854446136777,574.4156896079882
    rwilliams@trujillo.biz,"54560 Thompson Creek Apt. 029
    New Brianville, FL 84430-8588",BlanchedAlmond,31.42522688085481,13.27147504252467,37.23984661097634,4.022102909528949,530.766718654762
    randall85@williams.com,"5086 Morales Islands Apt. 099
    New Patricia, IL 78823",Black,33.62530726457669,12.988220598633102,39.672590955941864,3.9694177591077393,581.7987976770314
    kevin45@mathews.net,"02393 Baker Falls
    New Georgeport, ND 36338-5110",DodgerBlue,31.8627411090001,14.039867262521906,37.02226898591233,3.7382251733253336,556.2981411740467
    deborah48@white.com,"1693 Gary Mission Suite 479
    Lake Kelly, MO 68205",DarkGreen,33.29258730730077,11.906507762219915,38.42286529341121,3.37668749953603,502.13278922725397
    hoganrichard@george.com,"4929 Michelle Grove
    Lake Alexis, MT 92147-1660",BlanchedAlmond,33.74922777081331,11.137140302310659,38.40137368953426,4.595522708601322,556.1863688687886
    kelly24@lewis.info,"983 Ross Glen
    West Jessica, NJ 42860-5757",Bisque,34.14496898723948,12.902664889103926,36.61119877576035,2.2239934582520533,475.07162989966184
    katherinegray@yahoo.com,"685 Sexton Ranch Suite 125
    Lake Robertshire, NE 04469-3024",Cyan,31.12397434991195,12.386516256494852,35.63211221551042,4.288486770885737,486.9470538397658
    efoster@williamson-boyd.org,"4968 Bennett Manors
    Rogerschester, IL 81579-8333",Lavender,34.27824787999725,11.822721745594304,36.30854529439036,2.1173825415272596,434.1442020262987
    jordandavid@gmail.com,"61502 Parker Vista Apt. 363
    Jonesshire, GU 33532",Violet,33.66661568345138,10.9857637851215,36.35250276938114,0.9364975973183265,304.1355915788555
    sanchezamber@scott-patterson.com,"257 Hunt Manors
    South Charlottefort, CT 15033",Fuchsia,32.25997326555701,14.132893457553365,37.023479236405706,3.7620704427115657,571.2160048349454
    tinayoung@hotmail.com,"83995 Owens Course Apt. 747
    South Jennifer, NJ 29942",MistyRose,35.43316530057876,11.912210479900578,36.08964365766702,4.00096358646012,583.0796356620574
    alicia28@fuller.com,"8055 Robinson Brooks Apt. 657
    Walterview, KY 83019",CadetBlue,31.967320947882403,11.481587147836263,39.24096484164356,3.5325171645393527,445.74984123965226
    rileyalejandro@gmail.com,"Unit 1475 Box 4215
    DPO AE 39546-5591",LightSteelBlue,32.149060522105984,10.04731473507118,37.181447310649894,3.5350884276189447,392.9922559140308
    oliviamarshall@sawyer-sellers.com,"Unit 5934 Box 9748
    DPO AA 37361-3043",Brown,33.918844177834046,12.428736927868275,37.30536187928602,4.158214652664192,565.9943634015268
    hortonrobert@hotmail.com,"31309 Stacey Keys Apt. 979
    South Jason, KS 35357",Salmon,33.20061634140451,11.965980266792482,36.831535850846905,3.5490360574269735,499.1401524490539
    montgomerycheyenne@hotmail.com,"1812 Sandra Shoal Apt. 350
    Amandamouth, SC 87794-1628",FireBrick,32.53677489754807,11.121366060509414,36.97937237345656,4.1292546880945356,510.5394216996283
    martinkristi@sanchez-coleman.com,"PSC 1893, Box 7023
    APO AA 73445",Lime,34.08366330162949,8.668349517101323,35.906756365793065,2.2524459633808416,308.52774655803336
    jefferycampbell@gmail.com,"381 Ashley Locks Suite 366
    North Migueltown, TX 09795-0494",GreenYellow,33.02502013857587,12.504219807675254,37.64583878801402,4.051382465375181,561.5165319790891
    webertom@phelps.com,"189 Crawford Hill Apt. 746
    New Madison, WV 14108-4333",DarkOrchid,31.268104210750717,12.132509111641538,35.4567981489283,3.0720761414868827,423.47053317382387
    aschmidt@johnson.biz,"Unit 1743 Box 8085
    DPO AE 47693-8164",Blue,32.21292383005795,11.732991461588078,35.633953947400784,4.331863026751083,513.1531118530668
    lisadelgado@gmail.com,"57993 Jennifer Unions Suite 685
    Emilyville, OK 53366-2375",Olive,33.499506100675546,11.946590884981754,36.486325072393406,3.937862643180167,529.1945188649573
    sharongraves@yahoo.com,"73098 Ronald Port
    Cliffordborough, MO 37479-9244",Wheat,32.90485366735398,12.556107616938167,37.80550943244919,0.2699010899842742,314.4385182951061
    flevine@gmail.com,"5292 Melanie Crescent Apt. 064
    Fischerborough, NV 85721-5045",AliceBlue,32.204654645678524,12.480701517118195,37.680287608367976,3.2794662600656097,478.5842860083426
    rskinner@johnson-jefferson.com,"24725 Neal Lock
    Cynthiaville, NY 51578",OliveDrab,32.67515450844823,12.594194066191111,37.68387537364701,2.5717778354776577,444.58216497865277
    kiarakim@harris.org,"1502 Gonzalez Throughway
    Kathrynchester, FM 86014-7194",Linen,32.99838766242905,10.946841939586896,37.64780805527063,3.8260306175375143,475.01540708775025
    rachelrodriguez@lara-waters.com,"35466 Tommy Stream
    Port Daniellemouth, KS 68863-6330",LightSlateGray,33.9431185791017,11.48419869378604,36.83936583281821,2.4024538334142234,436.7205558562188
    dbrown@gmail.com,"76666 Kathy Locks
    Port Susan, ME 64335",Indigo,33.55210836340867,11.120870867123784,36.80837605948795,4.02781384191709,521.1953105318003
    mary45@gmail.com,"33213 Tanner Knolls Apt. 519
    Whiteborough, OR 37119-7790",Lime,33.67683086814267,10.971392430875488,37.72236711094261,3.629339915268192,478.18305971187965
    marcusleach@floyd.org,"Unit 3998 Box 4348
    DPO AA 37629",SteelBlue,32.64194636558817,11.588948579712497,36.32214091690131,3.189609941879746,432.48116855701767
    lmunoz@yahoo.com,"2100 Austin Camp Apt. 943
    Anthonymouth, WV 24243-3781",Olive,33.42121218172261,10.706641521307747,35.766153500383716,3.3939750434342972,438.30370784642975
    dvasquez@wiley.com,"967 Chloe Springs Suite 554
    Lake Ashley, GA 03230",HoneyDew,32.76707608122926,11.07625934092972,34.77975050203264,2.574948470025072,388.94054879219425
    dylanmartin@hotmail.com,"42644 Helen Keys Apt. 103
    Jessicahaven, KS 89406-1960",MidnightBlue,33.11995442833815,12.953262542191796,37.03427958207978,3.4720213800343784,534.7714849461672
    xkaufman@gmail.com,"02342 Melissa Islands
    Smithhaven, KS 68335",DarkViolet,35.37187609232446,10.572466600106116,36.86218334634355,4.198349060814376,537.9157529213054
    jasonhensley@yahoo.com,"97262 Brian Skyway
    Lake Marissa, GU 96859",Sienna,33.9760825800378,11.658036814224134,37.42527868006791,2.086348146609663,407.8763782204976
    gstrong@hotmail.com,"7875 Landry Road Apt. 947
    Brownshire, NC 10074-7735",Pink,34.03416353106073,13.592512657946294,36.83865678634849,3.6059339177330707,618.8459704239658
    arnoldsamuel@wilson.com,"949 Tapia Viaduct
    Martinezfurt, CT 79271-8205",LightSkyBlue,32.77049215854934,11.371767361248999,35.26149811626243,4.034386130357466,502.77107456549606
    scottrose@yahoo.com,"50639 Sarah Isle Apt. 268
    Yangmouth, MO 05540",SaddleBrown,33.50381038174352,11.233414953540922,37.211152581351115,2.320550249888456,397.420584096457
    salazarkaren@hotmail.com,"51173 Burton Wall Apt. 417
    Prestonville, NY 37002",SteelBlue,31.874551694585367,10.290350765056484,36.929761561703394,3.491093337009152,392.2852442462675
    susanibarra@yahoo.com,"426 Scott Radial Apt. 065
    Abigailstad, MS 16590-2222",Thistle,32.53323998265473,14.121783839255324,38.40632901011416,5.320093863780987,689.2356997616951
    nhenry@hotmail.com,"3874 Harper Plaza
    North Nancy, ME 96802-9462",BlanchedAlmond,34.85131416586477,12.41554196333362,37.67232248424959,3.1305384624648442,543.1326262891694
    millerrachel@gallagher-nichols.com,"Unit 4742 Box 9517
    DPO AE 67219-3123",Turquoise,34.21146128149797,10.770248917443363,34.649800047407126,4.985204970864011,577.7360248512277
    garciakevin@gmail.com,"845 Colleen Ways
    Lake Matthewview, VT 65340-3159",Orange,33.45961931752967,12.664390524735163,36.36684324701071,1.7269620431885113,436.58074034754827
    philliproberson@yahoo.com,"Unit 0373 Box 8981
    DPO AA 89902",Beige,34.200539409318985,12.667808875387266,37.48704924855169,3.7016222869142337,553.9946735912697
    kstafford@estes-nguyen.com,"PSC 4856, Box 1297
    APO AA 17032-7944",YellowGreen,31.169506798711588,13.970181074130446,36.67395273856423,1.7851739448879638,427.35653080229275
    kennethperry@bowen.org,"272 Frederick Lodge
    East Andrew, FL 07414",SlateGray,32.518196813999246,11.509253453525043,36.599289087393494,3.0226757598626595,424.7287739291025
    prussell@lopez.com,"9985 Wolf Pass
    Brandimouth, CA 63346",Bisque,34.523019620716326,11.405770450141057,36.378271013194265,4.041244969129275,541.0498309594356
    mosleyjacob@yahoo.com,"PSC 1790, Box 8872
    APO AE 01821-4769",Orange,33.66599032199544,12.263717676034362,38.86023443032663,3.13952693504287,469.38314617236114
    rhaas@yahoo.com,"4502 Jennifer Prairie Suite 029
    Lake Jesse, LA 02328-3633",DimGray,31.609839573389642,12.71070130045925,36.166463391921475,2.562818810803233,444.5455496511082
    antonioharris@hotmail.com,"4307 Nicholas Drive Apt. 259
    Ramirezberg, AS 59832",MediumBlue,33.70088553901973,13.471577671948916,37.0716431982524,2.3790764968915394,492.55683370047706
    austinthomas@gmail.com,"5855 Gross Burgs Suite 169
    Ballland, AS 98525",AntiqueWhite,33.81173340621725,11.186808718643787,36.29889307823573,4.301996499354755,535.3216100850124
    bethsullivan@reed.net,"80500 Mary Corners Apt. 225
    Wallsville, ME 80526",Beige,34.33667722314705,11.246812606011583,38.68258378408295,2.0947616690074846,408.9583359406166
    ncummings@yahoo.com,"344 Jessica Stravenue
    New Brian, MA 04730-6761",Beige,31.06132515671613,12.357638107209013,36.16604163340145,4.089330841235956,487.55545805790155
    hking@hotmail.com,"85181 Christian Courts Suite 758
    Larryfurt, MS 38722-6766",PeachPuff,33.06976829928679,11.764325958658198,36.875025808917755,3.5160510174718302,487.64623174384167
    annstone@hotmail.com,"543 Reynolds Burg
    Melindaberg, KY 46631",LightPink,34.60624245261783,11.761883803681748,38.12651979793058,1.8208106181524433,402.16712222372564
    christopher44@hotmail.com,"549 Anna Avenue
    Port Laura, CA 76209-9339",WhiteSmoke,34.23824191192028,11.550300110865926,35.769329630500295,4.1831436617261275,551.0230017027826
    autumn88@mendoza-mills.com,"214 Obrien Lakes Suite 572
    South Jeremy, KS 52867-7617",MediumOrchid,32.04781463313985,12.482669924970503,35.536024530304154,3.3939027880693717,497.38955775884335
    dhudson@ramos.net,"5661 Grant Centers
    Stevensfurt, CT 53959",Olive,30.97167564388777,11.731364294077403,36.074551140168914,4.4263640805293125,494.6386097568927
    egomez@hotmail.com,"768 Riley Pine Apt. 624
    Kellymouth, OK 98992-3108",MistyRose,33.60685082311888,12.21407374586628,37.198427822725975,2.905238361446573,479.2474167840931
    kimberlyruiz@smith-gordon.com,"503 Adams Pines Apt. 638
    North Ashleyside, AZ 34687-6128",DarkRed,33.44812500934655,11.903756682535942,36.87454360467994,2.782757828499416,462.65651893471335
    mooremichelle@logan.com,"07813 Randy Point
    Lake Thomasberg, MO 06013-9920",Pink,33.36938093820547,12.222483941893726,36.35523488364423,3.4470177927906893,515.5024796636585
    aaron22@gmail.com,"38678 Sean Drive Suite 293
    Karentown, IA 78306-2717",DarkGray,33.452295280190306,12.005916370756166,36.53409567089256,4.712233578509766,576.4776071703129
    michelleshepherd@price.com,"6820 Erica Vista Apt. 418
    Brightside, IA 50639",Orchid,32.90469244491627,11.91374515283876,36.058647603220486,1.2281124234144234,357.85798360521926
    zscott@wright.com,"9909 Hoffman Ranch Suite 195
    Scotthaven, SC 53575",PeachPuff,35.63085386109822,12.125401967944384,38.18776368086846,4.019051426800219,597.7398788791847
    tracy79@wheeler.net,"513 Moore Crescent Apt. 416
    Amandaberg, GU 03655-2219",Magenta,32.2463499961189,11.30555143041474,37.133126759376324,1.7073897286757314,327.37795258965207
    brian28@sanchez.org,"7446 Mary Ferry
    Lake Sherryfurt, GA 49066-0207",GhostWhite,34.69559119111866,11.608997070875462,37.68487727530606,3.1630919310737573,510.40138845250476
    leonardhancock@hotmail.com,"64147 Alexander Station Apt. 474
    East Jasonview, MN 83788",SeaShell,34.34392190842758,11.693058197072652,36.812934125501464,3.4470928961368963,510.50147847479735
    davidsonkathleen@gmail.com,"70128 Zimmerman Overpass
    Robertsshire, VA 59860",DarkBlue,33.680936949606156,11.201569884684467,37.83544772741218,2.208813678005546,403.8195198321978
    nathan84@lowery.net,"01242 Stephanie Ways Suite 003
    Churchville, MO 35617",MediumSeaGreen,32.06091439841006,12.625432642053951,35.539142427505084,5.412357839551379,627.603318713015
    kellydeborah@chan.biz,"354 Sanchez Wall Suite 884
    Juliabury, VI 39735",DarkTurquoise,33.431097102487136,13.35063168445937,37.96597162275134,2.768851943263104,510.661792219672
    lewisjessica@craig-evans.com,"4483 Jones Motorway Suite 872
    Lake Jamiefurt, UT 75292",Tan,33.23765998436727,13.566159613087605,36.417984796396794,3.7465729731034663,573.8474377162277
    katrina56@gmail.com,"172 Owen Divide Suite 497
    West Richard, CA 19320",PaleVioletRed,34.70252897286158,11.695736293481328,37.190267710452595,3.5765259152594644,529.0490041294304
    dale88@hotmail.com,"0787 Andrews Ranch Apt. 633
    South Chadburgh, TN 56128",Cornsilk,32.64677668060689,11.499409061002083,38.33257633196044,4.958264472618698,551.6201454762476
    cwilson@hotmail.com,"680 Jennifer Lodge Apt. 808
    Brendachester, TX 05000-5873",Teal,33.322501051305466,12.391422991118318,36.840085729767004,2.336484668112853,456.469510066298
    hannahwilson@davidson.com,"49791 Rachel Heights Apt. 898
    East Drewborough, OR 55919-9528",DarkMagenta,33.71598091844986,12.418808324753911,35.771016191612965,2.735159567082275,497.7786422156802
    `,
    datasetName: 'Ecommerce Customers',
    publishDate: '12/1/2023, 4:59:59 PM',
    size: 'small',
  },
];

export default firestoreDatasets;

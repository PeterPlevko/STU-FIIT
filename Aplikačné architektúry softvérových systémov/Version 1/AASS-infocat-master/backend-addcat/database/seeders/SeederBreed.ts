import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Breed from 'App/Models/Breed'

export default class extends BaseSeeder {
  public async run() {
    await Breed.createMany([
      {
        code: 'EXO',
      },
      {
        code: 'PER',
      },
      {
        code: 'RAG',
      },
      {
        code: 'SBI',
      },
      {
        code: 'TUV',
      },
      {
        code: 'ACL',
      },
      {
        code: 'ACS',
      },
      {
        code: 'LPL',
      },
      {
        code: 'LPS',
      },
      {
        code: 'MCO',
      },
      {
        code: 'NEM',
      },
      {
        code: 'NFO',
      },
      {
        code: 'SIB',
      },
      {
        code: 'TUA',
      },
      {
        code: 'BEN',
      },
      {
        code: 'BLH',
      },
      {
        code: 'BML',
      },
      {
        code: 'BSH',
      },
      {
        code: 'BUR',
      },
      {
        code: 'CHA',
      },
      {
        code: 'CYM',
      },
      {
        code: 'EUR',
      },
      {
        code: 'KBL',
      },
      {
        code: 'KBS',
      },
      {
        code: 'KOR',
      },
      {
        code: 'MAN',
      },
      {
        code: 'MAU',
      },
      {
        code: 'OCI',
      },
      {
        code: 'SIN',
      },
      {
        code: 'SNO',
      },
      {
        code: 'SOK',
      },
      {
        code: 'SRL',
      },
      {
        code: 'SRS',
      },
      {
        code: 'ABY',
      },
      {
        code: 'BAL',
      },
      {
        code: 'CRX',
      },
      {
        code: 'DRX',
      },
      {
        code: 'DSP',
      },
      {
        code: 'GRX',
      },
      {
        code: 'JBS',
      },
      {
        code: 'OLH',
      },
      {
        code: 'OSH',
      },
      {
        code: 'PEB',
      },
      {
        code: 'RUS',
      },
      {
        code: 'SIA',
      },
      {
        code: 'SOM',
      },
      {
        code: 'SPH',
      },
      {
        code: 'THA',
      },
      {
        code: 'HCL',
      },
      {
        code: 'HCS',
      },
    ])
  }
}

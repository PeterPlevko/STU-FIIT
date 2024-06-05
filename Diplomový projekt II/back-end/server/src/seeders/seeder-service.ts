// seeder.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FirebaseService } from '../firebase/fire-base.service';
import firestoreDatasets from './seed-firebase';
import { SeedNeo4jService } from './seed-neo4j-service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly seedNeo4jService: SeedNeo4jService,
  ) {}

  async seedData() {
    const app = this.firebaseService.getAdmin();
    const db = app.firestore();
    const datasetsCollection = db.collection('datasets');

    for (const dataset of firestoreDatasets) {
      // Check if the dataset with the same ID exists
      const datasetId = dataset.id;
      const existingDataset = await datasetsCollection.doc(datasetId).get();

      if (!existingDataset.exists) {
        // Dataset doesn't exist, so add it
        await datasetsCollection.doc(datasetId).set(dataset);
        console.log('Dataset added to Firestore.');
      }
    }

    // Seed Neo4j
    this.seedNeo4jService.createAnnotation();
    console.log('database seeded');
  }

  onApplicationBootstrap() {
    if (process.env.SEED_DATABASE === 'true') {
      this.seedData(); // Run the seeder when the application is bootstrapped.
    }
  }
}

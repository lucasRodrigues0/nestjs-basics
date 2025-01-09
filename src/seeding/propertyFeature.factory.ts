import { Faker } from "@faker-js/faker";
import { PropertyFeature } from "../entities/propertyFeature.entity";
import { setSeederFactory } from "typeorm-extension";

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, (faker: Faker) => {

    const feature = new PropertyFeature();

    feature.area = faker.number.int({ min: 25, max: 25000 });
    feature.bathrooms = faker.number.int({ min: 1, max: 4 });
    feature.bedrooms = faker.number.int({ min: 1, max: 4 });
    feature.parkingSpots = faker.number.int({ min: 0, max: 2 });
    feature.hasBalcony = faker.datatype.boolean();
    feature.hasGardenYard = faker.datatype.boolean();
    feature.hasSwimmingPool = faker.datatype.boolean();

    return feature;

})
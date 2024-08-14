import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';
export type Testinput2BodyParam = FromSchema<typeof schemas.Testinput2.body>;
export type Testinput2MetadataParam = FromSchema<typeof schemas.Testinput2.metadata>;
export type Testinput2Response200 = FromSchema<typeof schemas.Testinput2.response['200']>;
export type Testinput2Response400 = FromSchema<typeof schemas.Testinput2.response['400']>;
export type Testinput6BodyParam = FromSchema<typeof schemas.Testinput6.body>;
export type Testinput6MetadataParam = FromSchema<typeof schemas.Testinput6.metadata>;
export type Testinput6Response200 = FromSchema<typeof schemas.Testinput6.response['200']>;
export type Testinput6Response400 = FromSchema<typeof schemas.Testinput6.response['400']>;
export type Testinput6Response415 = FromSchema<typeof schemas.Testinput6.response['415']>;

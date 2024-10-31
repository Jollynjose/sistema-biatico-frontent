import { CombustibleValues, TransporteValues } from '@/interfaces/viaticos';
import * as yup from 'yup';

const ViaticosPorPersonaSchema = yup.object().shape({
  position: yup
    .array()
    .of(yup.string().required())
    .min(1)
    .nonNullable()
    .required(),
  employeeName: yup.string().required(),
  fullName: yup.string().required(),
  breakfast: yup.number().required(),
  isBreakfastActive: yup.boolean().default(true).required(),
  isLunchActive: yup.boolean().default(true).required(),
  lunch: yup.number().required(),
  dinner: yup.number().required(),
  isDinnerActive: yup.boolean().default(true).required(),
  accommodation: yup.number().required(),
  passage: yup.number().required(),
  total: yup.number().required(),
});

const ViaticosSchema = yup.object().shape({
  people: yup.array().of(ViaticosPorPersonaSchema).min(2).required(),
  tolls: yup.array().of(yup.number().required()).min(2).required(),
  solicitudeDate: yup.date().required(),
  visitMotivation: yup.string().required(),
  dependency: yup.string().required(),
  transportation: yup
    .string()
    .oneOf([TransporteValues.INSTITUCIONAL, TransporteValues.PARTICULAR])
    .default(TransporteValues.INSTITUCIONAL)
    .required(),
  fuel: yup
    .string()
    .oneOf([CombustibleValues.GASOLINA, CombustibleValues.GASOIL])
    .default(CombustibleValues.GASOLINA)
    .required(),
  site: yup.string().required(),
  startPoint: yup.string().required(),
  visitPlace: yup.string().required(),
  kilometers: yup.number().required(),
  fuelPrice: yup.number().required(),
  fuelGallons: yup.number().required(),
  cashAmount: yup.number().required(),
  departureTime: yup.date().required(),
  arrivalTime: yup.date().required(),
});

export type ViaticosSchemaType = yup.InferType<typeof ViaticosSchema>;

export default ViaticosSchema;

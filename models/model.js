import { Schema, model } from 'mongoose';

export default function create(name, body) {
    return model(name, new Schema(body))
}
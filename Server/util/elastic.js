var elasticsearch = require('elasticsearch');
const models = require("../models");
const AARYear = models.aar_year;
const AARBrand = models.aar_brand;
const AARModel = models.aar_model;
const AARType = models.aar_type;
const AARVariant = models.aar_variant;

class MyElastic {
    constructor() {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
            apiVersion: '7.3', // use the same version of your Elasticsearch instance
        });
    }

    async init() {
        try {
            const count = await AARYear.count({ where: { status: '1' } });
            for (let i = 0; i < count; i = i + 50) {
                await this.insertByGroup(i)
            }
        } catch (e) {
            res.status(500).send({ error: e.message });
        }
    }

    async insertByGroup(start) {
        try {
            const aaryear = await AARYear.findAll({
                attributes: ['id', 'variant_id', 'title'],
                where: { status: '1' },
                order: [['id', 'ASC']],
                offset: start, limit: 50
            });
            let item_count = aaryear.length;
            let variant_id = aaryear.map(a => a.variant_id);
            const aarvariant = await AARVariant.findAll({
                attributes: ['id', 'type_id', 'title'],
                where: { status: '1', id: variant_id }
            });
            let type_id = aarvariant.map(a => a.type_id);
            const aartype = await AARType.findAll({
                attributes: ['id', 'model_id', 'title'],
                where: { status: '1', id: type_id }
            });
            let model_id = aartype.map(a => a.model_id);
            const aarmodel = await AARModel.findAll({
                attributes: ['id', 'brand_id', 'title'],
                where: { status: '1', id: model_id }
            });
            let brand_id = aarmodel.map(a => a.brand_id);
            const aarbrand = await AARBrand.findAll({
                attributes: ['id', 'title'],
                where: { status: '1', id: brand_id }
            });
            for (let i = 0; i < item_count; i++) {
                const variant = aarvariant.find(({ id }) => id === aaryear[i]['variant_id']);
                const type = aartype.find(({ id }) => id === variant['type_id']);
                const model = aarmodel.find(({ id }) => id === type['model_id']);
                const brand = aarbrand.find(({ id }) => id === model['brand_id']);
                let body = {
                    'year_id': aaryear[i]['id'],
                    'year': aaryear[i]['title'],
                    'variant': variant['title'],
                    'variant_id': aaryear[i]['variant_id'],
                    'type': type['title'],
                    'type_id': variant['type_id'],
                    'model': model['title'],
                    'model_id': type['model_id'],
                    'brand': brand['title'],
                    'brand_id': model['brand_id']
                }
                await this.client.index({
                    index: 'aar_data',
                    id: body.year_id,
                    body: body
                })
            }
        } catch (err) {

        }
    }

    async insert1Data(id) {
        try {
            const aaryear = await AARYear.findOne({ where: { status: 1, year_id: id } })
            const variant_id = aaryear.variant_id;
            const aarvariant = await AARVariant.findOne({ where: { status: 1, id: variant_id } })
            const type_id = aarvariant.type_id;
            const aartype = await AARType.findOne({ where: { status: 1, id: type_id } })
            const model_id = aartype.model_id;
            const aarmodel = await AARModel.findOne({ where: { status: 1, id: model_id } })
            const brand_id = aarmodel.brand + id;
            const aarbrand = await AARBrand.findOne({ where: { status: 1, id: brand_id } })
            let body = {
                'year_id': aaryear[i]['id'],
                'year': aaryear[i]['title'],
                'variant': aarvariant['title'],
                'variant_id': aaryear[i]['variant_id'],
                'type': aartype['title'],
                'type_id': aarvariant['type_id'],
                'model': aarmodel['title'],
                'model_id': aartype['model_id'],
                'brand': aarbrand['title'],
                'brand_id': aarmodel['brand_id']
            }
            await this.client.index({
                index: 'aar_data',
                id: body.year_id,
                body: body
            })
        } catch (err) {

        }
    }

    async search(query) {
        try {
            const response = await this.client.search({
                index: 'aar_data',
                q: query
            });
            return response.hits.hits;
        } catch (err) {
            return [];
        }
    }
}

module.exports = MyElastic;

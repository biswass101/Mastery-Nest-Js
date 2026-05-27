import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Sales } from './schemas/sales.schema';
import { Customer } from './schemas/cutomer.schema';

@Injectable()
export class SalesService {
    constructor(
        @InjectModel(Sales.name)
        private salesModel: Model<Sales>,

        @InjectModel(Customer.name)
        private customerModel: Model<Customer>
    ) { }

    async findAll(): Promise<Sales[]> {
        return this.salesModel.find().populate('customer_id')
    }

    // Q: List all sales from store A
    /* 
        async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $match: {
                    store: "A"
                }
            }
        ])
      }
    
    */

    // Q: sort all the sales by date in descending order
    /*
        async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $sort: {
                    date: -1
                },
            },
        ])
    }
    */

    // Q: Two most recent sells
    /*
        async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $sort: {
                    date: -1
                },
            },
            {
                $limit: 2
            }
        ])
    }
    }
    */

    // Q: What is the total quantity sold for each item in the sales collection? 

    /*
        async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $group: {
                    _id: "$item",
                    totalQuantity: {
                        $sum: "$quantity"
                    }
                }
            }
        ])
    }
    */

    // Q: Total Revenue of all sales 
    /*
        async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            }
        ])
    }
    */

    // Q: Adding Revenue field to each collection
    /*
        async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $addFields: {
                    revenue: {
                        $multiply: ["$price", "$quantity"]
                    }
                }
            }
        ])

    }
    */


    // Q: Find the average quantity sold per store
    async runAggQueries() {
        return this.salesModel.aggregate([
            {
                $group: {
                    _id: "$store",
                    avgQty: {
                        $avg: "$quantity"
                    }
                }
            }
        ])

    }
}
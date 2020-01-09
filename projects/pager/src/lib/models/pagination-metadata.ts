export class PaginationMetadata {
    constructor(public currentPage: number = 1, public totalPages: number = 0, public pageSize: number = 25,
                public totalCount: number = 0, public hasPrevious: boolean = false, public hasNext: boolean = false) {
    }
}

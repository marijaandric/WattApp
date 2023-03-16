FROM mcr.microsoft.com/dotnet/sdk:7.0

COPY . ./

WORKDIR /wattApp/backend/backend

RUN dotnet restore && \
    dotnet build
    
CMD ["dotnet", "run"]
